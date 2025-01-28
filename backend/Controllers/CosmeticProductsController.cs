using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication for all endpoints
    public class CosmeticProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CosmeticProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/cosmeticproducts
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.CosmeticProducts.ToListAsync();
            return Ok(products);
        }

        // GET: api/cosmeticproducts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.CosmeticProducts.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        // POST: api/cosmeticproducts
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CosmeticProduct product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            _context.CosmeticProducts.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // PUT: api/cosmeticproducts/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CosmeticProduct updatedProduct)
        {
            if (id != updatedProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/cosmeticproducts/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.CosmeticProducts.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.CosmeticProducts.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.CosmeticProducts.Any(e => e.Id == id);
        }
    }
}