using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }

        // GET: api/cart
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cart = await _context.Carts
                .Include(c => c.Products)
                    .ThenInclude(cp => cp.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                // Create cart if not exists
                cart = new Cart { UserId = userId, Products = new List<CartProduct>() };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            return Ok(cart);
        }

        // POST: api/cart/add
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cart = await _context.Carts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId, Products = new List<CartProduct>() };
                _context.Carts.Add(cart);
            }

            var cartProduct = cart.Products.FirstOrDefault(cp => cp.ProductId == dto.ProductId);
            if (cartProduct != null)
            {
                cartProduct.Quantity += dto.Quantity;
            }
            else
            {
                cart.Products.Add(new CartProduct
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                });
            }

            // Update TotalAmount
            cart.TotalAmount = await CalculateCartTotal(cart);

            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        // DELETE: api/cart/remove/{productId}
        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cart = await _context.Carts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return NotFound("Cart not found.");

            var cartProduct = cart.Products.FirstOrDefault(cp => cp.ProductId == productId);
            if (cartProduct == null) return NotFound("Product not found in cart.");

            cart.Products.Remove(cartProduct);

            cart.TotalAmount = await CalculateCartTotal(cart);

            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        // PUT: api/cart/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateQuantity([FromBody] UpdateCartDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var cart = await _context.Carts
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return NotFound("Cart not found.");

            var cartProduct = cart.Products.FirstOrDefault(cp => cp.ProductId == dto.ProductId);
            if (cartProduct == null) return NotFound("Product not found in cart.");

            cartProduct.Quantity = dto.Quantity;

            cart.TotalAmount = await CalculateCartTotal(cart);

            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        private async Task<decimal> CalculateCartTotal(Cart cart)
        {
            decimal total = 0m;

            foreach (var cp in cart.Products)
            {
                var product = await _context.Products.FindAsync(cp.ProductId);
                if (product != null)
                {
                    total += product.Price * cp.Quantity;
                }
            }

            return total;
        }
    }
}
