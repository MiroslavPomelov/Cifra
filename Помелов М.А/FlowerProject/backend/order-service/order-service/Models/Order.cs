using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace order_service.Models
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int ShopId { get; set; }
        
        [Required]
        public decimal TotalAmount { get; set; }
        
        [Required]
        public string Status { get; set; } = "pending"; // Статусы - pending, confirmed, processing, delivered, cancelled
        
        [Required]
        public string DeliveryAddress { get; set; } = string.Empty;
        
        [Required]
        public string CustomerName { get; set; } = string.Empty;
        
        [Required]
        public string CustomerPhone { get; set; } = string.Empty;
        
        [Required]
        public string CustomerEmail { get; set; } = string.Empty;
        
        public string? DeliveryNotes { get; set; }
        
        public DateTime? EstimatedDeliveryDate { get; set; }
        
        public DateTime? ActualDeliveryDate { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
       
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
} 