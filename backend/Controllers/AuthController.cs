using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<ActionResult<string>> Register(RegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest("Email is already taken.");

        if (request.Role.ToLower() != "admin" && request.Role.ToLower() != "customer")
            return BadRequest("Role must be either 'Admin' or 'Customer'.");

        CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Role = request.Role,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        var tokens = CreateToken(user);
        user.RefreshToken = tokens.RefreshToken;
        user.TokenCreated = tokens.TokenCreated;
        user.TokenExpires = tokens.TokenExpires;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
            return BadRequest("User not found.");

        if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            return BadRequest("Wrong password.");

        var tokens = CreateToken(user);
        user.RefreshToken = tokens.RefreshToken;
        user.TokenCreated = tokens.TokenCreated;
        user.TokenExpires = tokens.TokenExpires;

        await _context.SaveChangesAsync();

        // Store refresh token in cookie (optional)
        Response.Cookies.Append("refreshToken", tokens.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Expires = tokens.TokenExpires
        });

        // Return the JWT and Refresh token as anonymous object
        return Ok(new
        {
            token = tokens.JwtToken,
            refreshToken = tokens.RefreshToken
        });
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<string>> RefreshToken([FromBody] string refreshToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token provided.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        if (user == null || user.TokenExpires < DateTime.UtcNow)
            return Unauthorized("Invalid or expired refresh token.");

        var tokens = CreateToken(user);
        user.RefreshToken = tokens.RefreshToken;
        user.TokenCreated = tokens.TokenCreated;
        user.TokenExpires = tokens.TokenExpires;

        await _context.SaveChangesAsync();

        // Optionally update the refresh token in the cookies
        Response.Cookies.Append("refreshToken", tokens.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Expires = tokens.TokenExpires
        });

        return Ok(new
        {
            token = tokens.JwtToken,
            refreshToken = tokens.RefreshToken
        });
    }


    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] string refreshToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token provided.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
        if (user == null)
            return Unauthorized("Invalid refresh token.");

        user.RefreshToken = null;
        user.TokenCreated = DateTime.MinValue;
        user.TokenExpires = DateTime.MinValue;

        await _context.SaveChangesAsync();

        // Optional: delete the cookie
        Response.Cookies.Delete("refreshToken");

        return Ok("Logged out successfully.");
    }


    // ====== Helpers ======

    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
    {
        using var hmac = new HMACSHA512();
        salt = hmac.Key;
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
    {
        using var hmac = new HMACSHA512(salt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(hash);
    }

    private (string JwtToken, string RefreshToken, DateTime TokenCreated, DateTime TokenExpires) CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("Jwt:Key").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: creds);

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(jwt);
        var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        return (
            JwtToken: jwtToken,
            RefreshToken: refreshToken,
            TokenCreated: DateTime.UtcNow,
            TokenExpires: DateTime.UtcNow.AddDays(7)
        );
    }
}
