public class Cart
{
    public int Id { get; set; }
    public int UserId { get; set; } // Foreign key to User
    public User User { get; set; } // Navigation property to User
    public ICollection<CartProduct> Products { get; set; } // List of products in the cart

    public decimal TotalAmount { get; set; } // Calculated total of all products in the cart
}
