using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Cart
    {
        public int Id { get; set; } // Primary Key

        public int UserId { get; set; } // Foreign Key for Users
        public int CosmeticProductId { get; set; } // Foreign Key for CosmeticProduct

        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        // Navigation Properties
        [JsonIgnore]
        public Users User { get; set; } // Reference to Users
        [JsonIgnore]
        public CosmeticProduct CosmeticProduct { get; set; } // Reference to CosmeticProduct
    }
}