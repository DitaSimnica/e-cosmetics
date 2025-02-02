﻿using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Orders
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string OrderNo { get; set; }
        public decimal OrderTotal { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CreatedOn { get; set; } // Timestamp for order creation
        public DateTime UpdatedOn { get; set; } // Timestamp for last update

        // Navigation property to Users
        [ForeignKey("UserId")]
        public Users User { get; set; } // Each order belongs to one user

        // Navigation property for order items (one-to-many relationship)
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}