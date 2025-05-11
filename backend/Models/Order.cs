public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; } // Foreign key to User
    public User User { get; set; } // Navigation property to User
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; } // Total price of the order
    public string Status { get; set; } // E.g., "Pending", "Shipped", "Delivered"
    public ICollection<Product> Products { get; set; } // Products in the order
}
