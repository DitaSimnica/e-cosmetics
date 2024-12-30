namespace backend.Models
{
    public class Cart
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public int CosmeticProductID { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
