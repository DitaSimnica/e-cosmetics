//using backend.Models;
//using backend.Services;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace backend.Helpers
////{
//    //public class JwtTokenService : IJwtTokenService
//    //{
//        //private readonly IConfiguration _configuration;

//        //public JwtTokenService(IConfiguration configuration)
//        //{
//        //    _configuration = configuration;
//        //}

//        //public string GenerateToken(Users user)
//        //{
//        //    var claims = new[]
//        //    {
//        //    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
//        //    new Claim(JwtRegisteredClaimNames.Email, user.Email),
//        //    new Claim("fullName", $"{user.FirstName} {user.LastName}"),
//        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//        //};

//        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
//        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//        //    var token = new JwtSecurityToken(
//        //        _configuration["Jwt:Issuer"],
//        //        _configuration["Jwt:Audience"],
//        //        claims,
//        //        expires: DateTime.Now.AddHours(1),
//        //        signingCredentials: creds
//        //    );

//        //    return new JwtSecurityTokenHandler().WriteToken(token);
////        }
////    }
////}
