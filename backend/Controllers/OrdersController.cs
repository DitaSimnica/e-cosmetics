using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/Orders/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Customer, Admin")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.CosmeticProduct) // Assuming the OrderItem has a Product navigation property
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Order not found." });
            }

            // For customers, they can only see their own orders
            if (User.IsInRole("Customer") && order.UserId != GetUserIdFromToken())
            {
                return Unauthorized(new { message = "You can only view your own orders." });
            }

            return Ok(order);
        }

        // POST: api/Orders
        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateOrder([FromBody] List<OrderItem> cartItems)
        {
            var userId = GetUserIdFromToken(); // Implement this method to get user ID from token
            if (userId == null) return Unauthorized(new { message = "Invalid token." });

            if (cartItems == null || cartItems.Count == 0)
            {
                return BadRequest(new { message = "Cart cannot be empty." });
            }

            var orderNo = Guid.NewGuid().ToString(); // Generate a unique order number
            var orderTotal = cartItems.Sum(item => item.UnitPrice * item.Quantity); // Calculate the total order value

            var order = new Orders
            {
                UserId = userId.Value,
                OrderNo = orderNo,
                OrderTotal = orderTotal,
                OrderStatus = "Pending", // You can change the status logic if needed
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
                OrderItems = cartItems
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, new { message = "Order created successfully." });
        }

        // Helper method to get user ID from the token
        private int? GetUserIdFromToken()
        {
            var userId = User.FindFirst("id")?.Value;
            return userId != null ? int.Parse(userId) : (int?)null;
        }
    }
}
