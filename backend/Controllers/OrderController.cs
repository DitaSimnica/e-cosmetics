using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        // GET: api/order (get current user's orders)
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var orders = await _context.Orders
                .Include(o => o.Products)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return Ok(orders);
        }

        // POST: api/order (place order from cart)
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cart = await _context.Carts
                .Include(c => c.Products)
                    .ThenInclude(cp => cp.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || cart.Products.Count == 0)
                return BadRequest("Cart is empty.");

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                TotalAmount = cart.TotalAmount,
                Products = cart.Products.Select(cp => cp.Product).ToList()
            };

            _context.Orders.Add(order);

            // Clear cart
            cart.Products.Clear();
            cart.TotalAmount = 0;

            await _context.SaveChangesAsync();

            return Ok(order);
        }

        // GET: api/order/my-orders (customer-specific view)
        [Authorize]
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdStr, out int userId))
                return Unauthorized("Invalid user ID.");

            var orders = await _context.Orders
                .Include(o => o.Products)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return Ok(orders);
        }

        // ✅✅✅ NEW: GET all orders (admin only)
        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Products)
                .Include(o => o.User) // if you want user info too
                .ToListAsync();

            return Ok(orders);
        }
    }
}
