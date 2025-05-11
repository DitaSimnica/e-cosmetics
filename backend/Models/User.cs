using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public byte[] PasswordHash { get; set; }

    [Required]
    public byte[] PasswordSalt { get; set; }

    [Required]
    public string Role { get; set; } // "Admin" or "Customer"
    
    //Refresh Token Support
    public string? RefreshToken { get; set; }
    public DateTime TokenCreated { get; set; }
    public DateTime TokenExpires { get; set; }
    public ICollection<Cart> Carts { get; set; } // One-to-many relationship with Cart
}
