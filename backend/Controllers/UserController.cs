using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace YourProject.Controllers  // Adjust with your actual namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // Helper method to get the current user ID from claims
        private int GetUserIdFromClaims()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

        // Get all users (only accessible by admins)
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role
                }).ToListAsync();

            return Ok(users);
        }

        // Get the currently logged-in user or a specific user by ID (only their own data)
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(int id)
        {
            var currentUserId = GetUserIdFromClaims();

            // Allow both admins and customers to see only their own account
            if (currentUserId != id)
            {
                return Forbid();  // Return 403 Forbidden if they try to access another user's data
            }

            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Role = u.Role
                }).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            // Check if the logged-in user is an admin or the user themselves
            if (User.IsInRole("Admin") || User.Identity.Name == user.Username)
            {
                return Ok(user);
            }

            return Unauthorized("You do not have permission to view this user's information.");
        }

        // Edit user information (only the user themselves or Admin can edit)
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            // Ensure the logged-in user is either an Admin or the user themselves
            if (User.IsInRole("Admin") || User.Identity.Name == user.Username)
            {
                user.Username = userDto.Username;
                user.Email = userDto.Email;
                // Optionally, update password, role, etc., if required

                await _context.SaveChangesAsync();
                return NoContent();
            }

            return Unauthorized("You do not have permission to update this user's information.");
        }

        // Delete a user (only the user themselves or Admin can delete)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            // Ensure the logged-in user is either an Admin or the user themselves
            if (User.IsInRole("Admin") || User.Identity.Name == user.Username)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            return Unauthorized("You do not have permission to delete this user.");
        }
    }
}
