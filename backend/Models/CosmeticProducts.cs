namespace backend.Models
{
    public class CosmeticProducts
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public int Status { get; set; }
        public string Type { get; set; }
    }
}
