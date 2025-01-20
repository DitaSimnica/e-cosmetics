//using backend.Data;
////using backend.Helpers;
//using backend.Models;
////using backend.Services;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using BCrypt.Net;

//namespace backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        //private readonly IJwtTokenService _jwtTokenService;

//        // Constructor
//        public AuthController(ApplicationDbContext context, /*IJwtTokenService jwtTokenService*/)
//        {
//            _context = context;
//            //_jwtTokenService = jwtTokenService;
//        }

//        [HttpPost("register")]
//        public async Task<IActionResult> Register([FromBody] Register model)
//        {
//            if (_context.Users.Any(u => u.Email == model.Email))
//                return BadRequest("Email is already registered.");

//            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

//            var user = new Users
//            {
//                FirstName = model.FirstName,
//                LastName = model.LastName,
//                Email = model.Email,
//                Password = hashedPassword,
//                CreatedOn = DateTime.Now
//            };

//            _context.Users.Add(user);
//            await _context.SaveChangesAsync();

//            return Ok("User registered successfully.");
//        }

//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] Login model)
//        {
//            var user = _context.Users.SingleOrDefault(u => u.Email == model.Email);
//            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
//                return Unauthorized("Invalid email or password.");

//            //var token = _jwtTokenService.GenerateToken(user);
//            return Ok(new { Token = token });
//        }
//    }
//}
