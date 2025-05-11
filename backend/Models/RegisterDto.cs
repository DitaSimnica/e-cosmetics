using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string Role { get; set; } // Must be "Admin" or "Customer"
}
