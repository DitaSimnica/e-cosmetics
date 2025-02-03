using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users (Admins only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/{id} (Admins only)
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            return user;
        }

        // PUT: api/Users/update (Customers can only update their own password)
        [HttpPut("update")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> UpdateUser([FromBody] Users updatedUser)
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized(new { message = "Invalid token." });

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound();

            // Only update the password if provided
            if (!string.IsNullOrEmpty(updatedUser.Password))
            {
                // Hash the password before saving
                user.Password = HashPassword(updatedUser.Password);
            }
            else
            {
                return BadRequest(new { message = "Password cannot be empty." });
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent(); // Return no content after updating
        }

        // DELETE: api/Users/{id} (Admins only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            return userIdClaim != null ? int.Parse(userIdClaim) : (int?)null;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }
    }
}
