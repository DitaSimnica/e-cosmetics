using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CosmeticProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CosmeticProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CosmeticProducts (For customers and admins)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CosmeticProduct>>> GetCosmeticProducts()
        {
            return await _context.CosmeticProducts.ToListAsync();
        }

        // GET: api/CosmeticProducts/{id} (For customers and admins)
        [HttpGet("{id}")]
        public async Task<ActionResult<CosmeticProduct>> GetCosmeticProduct(int id)
        {
            var cosmeticProduct = await _context.CosmeticProducts.FindAsync(id);

            if (cosmeticProduct == null)
            {
                return NotFound();
            }

            return cosmeticProduct;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostCosmeticProduct([FromBody] CosmeticProduct cosmeticProduct)
        {
            if (cosmeticProduct == null)
            {
                return BadRequest("Invalid product data.");
            }

            // Ensure ID is not being set manually
            cosmeticProduct.Id = 0;  // This ensures no value is inserted into the ID field

            _context.CosmeticProducts.Add(cosmeticProduct);
            await _context.SaveChangesAsync();

            // Return success message after successful creation
            return CreatedAtAction(nameof(GetCosmeticProduct), new { id = cosmeticProduct.Id }, new { message = "Cosmetic product created successfully!" });
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutCosmeticProduct(int id, [FromBody] CosmeticProduct cosmeticProduct)
        {
            if (cosmeticProduct == null || id != cosmeticProduct.Id)
            {
                return BadRequest("Product data is invalid.");
            }

            var existingProduct = await _context.CosmeticProducts.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound(new { message = "Cosmetic product not found." });
            }

            // Update the product fields
            existingProduct.Name = cosmeticProduct.Name;
            existingProduct.Brand = cosmeticProduct.Brand;
            existingProduct.UnitPrice = cosmeticProduct.UnitPrice;
            existingProduct.Discount = cosmeticProduct.Discount;
            existingProduct.Quantity = cosmeticProduct.Quantity;
            existingProduct.ImageUrl = cosmeticProduct.ImageUrl;
            existingProduct.Status = cosmeticProduct.Status;
            existingProduct.Type = cosmeticProduct.Type;
            existingProduct.Category = cosmeticProduct.Category;
            existingProduct.Tags = cosmeticProduct.Tags;

            await _context.SaveChangesAsync();

            // Return success message after successful update
            return Ok(new { message = "Cosmetic product updated successfully!" });
        }


        // DELETE: api/CosmeticProducts/{id} (Admins only)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCosmeticProduct(int id)
        {
            var cosmeticProduct = await _context.CosmeticProducts.FindAsync(id);
            if (cosmeticProduct == null)
            {
                return NotFound(new { message = "Cosmetic product not found." });
            }

            _context.CosmeticProducts.Remove(cosmeticProduct);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cosmetic product deleted successfully!" });
        }


        private bool CosmeticProductExists(int id)
        {
            return _context.CosmeticProducts.Any(e => e.Id == id);
        }
    }
}
