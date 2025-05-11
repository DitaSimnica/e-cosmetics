using System.ComponentModel.DataAnnotations;

public class CartProduct
{
    public int CartId { get; set; }  // Foreign key to Cart
    public Cart Cart { get; set; }   // Navigation property to Cart

    public int ProductId { get; set; } // Foreign key to Product
    public Product Product { get; set; } // Navigation property to Product

    public int Quantity { get; set; } // Quantity of this product in the cart
}
