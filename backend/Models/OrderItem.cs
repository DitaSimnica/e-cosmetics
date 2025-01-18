namespace backend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        // Foreign Key properties
        public int OrderId { get; set; }
        public int CosmeticProductId { get; set; }

        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        // Navigation properties
        public Orders Orders { get; set; }  // Link to the Order this item belongs to
        public CosmeticProduct CosmeticProduct { get; set; }  // Link to the CosmeticProduct being ordered
    }
}
