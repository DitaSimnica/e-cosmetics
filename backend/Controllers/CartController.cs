using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication for all endpoints
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetUserIdFromJwt()
        {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
            var userId = jsonToken?.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            return int.Parse(userId);
        }

        // GET: api/cart
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserIdFromJwt();
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.CosmeticProduct)
                .ToListAsync();

            return Ok(cartItems);
        }

        // GET: api/cart/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartItemById(int id)
        {
            var userId = GetUserIdFromJwt();
            var cartItem = await _context.Carts
                .Where(c => c.UserId == userId && c.Id == id)
                .Include(c => c.CosmeticProduct)
                .FirstOrDefaultAsync();

            if (cartItem == null)
            {
                return NotFound();
            }

            return Ok(cartItem);
        }

        // POST: api/cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] Cart cart)
        {
            if (cart == null)
            {
                return BadRequest();
            }

            var userId = GetUserIdFromJwt();
            cart.UserId = userId;

            // Check if the item already exists in the cart
            var existingCartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.CosmeticProductId == cart.CosmeticProductId);

            if (existingCartItem != null)
            {
                // Optionally, update quantity and total price if item exists
                existingCartItem.Quantity += cart.Quantity;
                existingCartItem.TotalPrice = existingCartItem.Quantity * existingCartItem.UnitPrice * (1 - existingCartItem.Discount);
                _context.Entry(existingCartItem).State = EntityState.Modified;
            }
            else
            {
                cart.TotalPrice = cart.Quantity * cart.UnitPrice * (1 - cart.Discount);
                _context.Carts.Add(cart);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItemById), new { id = cart.Id }, cart);
        }

        // PUT: api/cart/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] Cart updatedCartItem)
        {
            if (id != updatedCartItem.Id)
            {
                return BadRequest();
            }

            var userId = GetUserIdFromJwt();
            var existingCartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.Id == id);

            if (existingCartItem == null)
            {
                return NotFound();
            }

            existingCartItem.Quantity = updatedCartItem.Quantity;
            existingCartItem.TotalPrice = existingCartItem.Quantity * existingCartItem.UnitPrice * (1 - existingCartItem.Discount);

            _context.Entry(existingCartItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cart/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var userId = GetUserIdFromJwt();
            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.Id == id);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
