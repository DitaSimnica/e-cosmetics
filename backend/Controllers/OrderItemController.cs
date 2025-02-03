using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // CREATE: Add order item
        [HttpPost]
        [Authorize(Roles = "Admin,Customer")]  // Admin and Customer can add order items (assuming Admin adds manually, and Customer places orders)
        public async Task<IActionResult> AddOrderItem([FromBody] OrderItem orderItem)
        {
            if (orderItem == null)
            {
                return BadRequest("Order item is null.");
            }

            // Calculate the total price for the order item
            orderItem.TotalPrice = orderItem.UnitPrice * orderItem.Quantity * (1 - orderItem.Discount / 100);

            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AddOrderItem), new { id = orderItem.Id }, orderItem);
        }

        // READ: Get all order items for a specific order
        [HttpGet("order/{orderId}")]
        [Authorize(Roles = "Admin,Customer")]  // Admin and Customer can get order items (admins see all orders)
        public async Task<IActionResult> GetOrderItemsByOrderId(int orderId)
        {
            var orderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Include(oi => oi.CosmeticProduct)
                .ToListAsync();

            if (orderItems == null || orderItems.Count == 0)
            {
                return NotFound("No items found for this order.");
            }

            return Ok(orderItems);
        }

        // UPDATE: Update an order item (e.g., quantity, price)
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]  // Only Admin can update order items (this could be adjusted based on use case)
        public async Task<IActionResult> UpdateOrderItem(int id, [FromBody] OrderItem updatedOrderItem)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem == null)
            {
                return NotFound("Order item not found.");
            }

            // Update properties of the order item
            orderItem.Quantity = updatedOrderItem.Quantity;
            orderItem.UnitPrice = updatedOrderItem.UnitPrice;
            orderItem.Discount = updatedOrderItem.Discount;
            orderItem.TotalPrice = orderItem.UnitPrice * orderItem.Quantity * (1 - orderItem.Discount / 100);

            _context.OrderItems.Update(orderItem);
            await _context.SaveChangesAsync();
            return Ok("Order item updated successfully.");
        }

        // DELETE: Remove an order item by its ID
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]  // Only Admin can delete order items (this could be adjusted based on use case)
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            var orderItem = await _context.OrderItems.FindAsync(id);
            if (orderItem == null)
            {
                return NotFound("Order item not found.");
            }

            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();
            return Ok("Order item removed successfully.");
        }

        // DELETE: Remove all items in an order
        [HttpDelete("clear/{orderId}")]
        [Authorize(Roles = "Admin")]  // Only Admin can clear all items in an order
        public async Task<IActionResult> ClearOrderItems(int orderId)
        {
            var orderItems = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .ToListAsync();

            if (orderItems.Count == 0)
            {
                return NotFound("No items found in this order.");
            }

            _context.OrderItems.RemoveRange(orderItems);
            await _context.SaveChangesAsync();
            return Ok("All items removed from the order.");
        }
    }
}
