namespace backend.Models
{
    public class CosmeticProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; } // "Active", "Inactive", etc.
        public string Type { get; set; } // Optional: Specific product type
        public string Category { get; set; } // Add for better organization
        public string Tags { get; set; } // Comma-separated tags (e.g., "skincare,organic")
    }
}