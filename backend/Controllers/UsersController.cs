using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpGet("{id}")]
        //[Authorize]
        //public async Task<ActionResult<Users>> GetUser(int id)
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get ID from token
        //    if (userId == null || int.Parse(userId) != id)
        //    {
        //        return Unauthorized();
        //    }

        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    return user;
        //}

        //[HttpPost]
        //public async Task<ActionResult<Users>> PostUser(Users user)
        //{
        //    // Hash the password before saving
        //    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.Id }, user);
        //}

        [HttpGet]
        [Authorize(Roles = "Admin")] // Restrict access to Admins only
        public async Task<ActionResult<IEnumerable<object>>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(user => new
                {
                    user.Id,
                    user.FirstName,
                    user.LastName,
                    user.Email
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] Users updatedUser)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || int.Parse(userId) != id)
            {
                return Unauthorized("You can only update your own account.");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.Email = updatedUser.Email;

            if (!string.IsNullOrEmpty(updatedUser.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password); // Hash new password
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || int.Parse(userId) != id)
            {
                return Unauthorized("You can only delete your own account.");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
