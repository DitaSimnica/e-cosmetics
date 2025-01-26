using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models.Enums;

namespace backend.Models
{
    public class Users
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; } // Hashed password
        public decimal Fund { get; set; }

        [Column(TypeName = "varchar(20)")] // Specify the length as needed
        public UserType UserType { get; set; }
        public bool IsActive { get; set; } // Replaces Status
        public DateTime CreatedOn { get; set; }

        // Navigation property for orders (one-to-many relationship)
        public ICollection<Orders> Orders { get; set; }

        // Navigation property for cart (one-to-many relationship)
        public ICollection<Cart> Carts { get; set; }
    }
}