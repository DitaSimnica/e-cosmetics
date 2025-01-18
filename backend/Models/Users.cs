using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        public decimal Fund { get; set; }
        public string Type { get; set; } //Admin, Customer etc
        public int Status { get; set; }
        public DateTime CreatedOn { get; set; }

        // Navigation property for orders (one-to-many relationship)
        public ICollection<Orders> Orders { get; set; }

        // Navigation property for cart (one-to-many relationship)
        public ICollection<Cart> Carts { get; set; }
    }
}
