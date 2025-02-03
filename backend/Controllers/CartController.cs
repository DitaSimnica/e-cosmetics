using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // READ: Get all products in the user's cart
        [HttpGet]
        [Authorize]  // Ensure that only logged-in users can view their cart
        public async Task<IActionResult> GetCartItems([FromQuery] int userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.CosmeticProduct)
                .ToListAsync();

            if (cartItems == null || cartItems.Count == 0)
            {
                return NotFound("No items found in the cart.");
            }

            return Ok(cartItems);
        }

        // Add this method to your CartController
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart(int id)
        {
            var cart = await _context.Carts
                                     .Include(c => c.User)
                                     .Include(c => c.CosmeticProduct)
                                     .FirstOrDefaultAsync(c => c.Id == id);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            return Ok(cart);
        }

        [HttpPost]
        public async Task<ActionResult<Cart>> CreateCart(Cart cart)
        {
            // Retrieve the User and CosmeticProduct based on the userId and cosmeticProductId
            var user = await _context.Users.FindAsync(cart.UserId);
            var cosmeticProduct = await _context.CosmeticProducts.FindAsync(cart.CosmeticProductId);

            // Check if the User and CosmeticProduct exist in the database
            if (user == null)
            {
                return NotFound("User not found.");
            }
            if (cosmeticProduct == null)
            {
                return NotFound("Cosmetic product not found.");
            }

            // Set the User and CosmeticProduct in the cart
            cart.User = user;
            cart.CosmeticProduct = cosmeticProduct;

            // Calculate the total price
            cart.TotalPrice = (cart.UnitPrice - cart.Discount) * cart.Quantity;

            // Save the Cart to the database
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            // Return a successful response with the created Cart object
            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }


        // UPDATE: Update product details in the cart (quantity, price, etc.)
        [HttpPut("{id}")]
        [Authorize]  // Ensure that only logged-in users can update their cart
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] Cart updatedCartItem)
        {
            var cartItem = await _context.Carts.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound("Item not found in the cart.");
            }

            // Update the properties of the cart item
            cartItem.Quantity = updatedCartItem.Quantity;
            cartItem.UnitPrice = updatedCartItem.UnitPrice;
            cartItem.Discount = updatedCartItem.Discount;
            cartItem.TotalPrice = cartItem.UnitPrice * cartItem.Quantity * (1 - cartItem.Discount / 100);

            _context.Carts.Update(cartItem);
            await _context.SaveChangesAsync();
            return Ok("Cart item updated successfully.");
        }

        // DELETE: Remove a product from the cart
        [HttpDelete("{id}")]
        [Authorize]  // Ensure that only logged-in users can remove items from their cart
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Carts.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound("Item not found in the cart.");
            }

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();
            return Ok("Product removed from the cart.");
        }

        // DELETE: Remove all products from the user's cart
        [HttpDelete("clear/{userId}")]
        [Authorize]  // Ensure that only logged-in users can clear their cart
        public async Task<IActionResult> ClearCart(int userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (cartItems.Count == 0)
            {
                return NotFound("No items found in the cart.");
            }

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();
            return Ok("All products removed from the cart.");
        }
    }
}
