namespace backend.Models
{
    public class Cart
    {
        public int Id { get; set; }

        // Foreign Key properties
        public int UserId { get; set; }
        public int CosmeticProductId { get; set; }

        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        public Users User { get; set; }  // Link to the User who owns this cart
        public CosmeticProduct CosmeticProduct { get; set; }  // Link to the CosmeticProducts in the cart
    }
}