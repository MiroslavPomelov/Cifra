using System;
using System.ComponentModel.DataAnnotations;

namespace order_service.Models
{
    public class OrderItem
    {
        [Key]
        public Guid OrderItemId { get; set; }
        
        [Required]
        public Guid OrderId { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        public string ProductName { get; set; } = string.Empty;
        
        public string? ProductDescription { get; set; }
        
        [Required]
        public decimal UnitPrice { get; set; }
        
        [Required]
        public int Quantity { get; set; }
        
        [Required]
        public decimal TotalPrice { get; set; }
        
        public string? ProductImage { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        

        public Order Order { get; set; } = null!;
    }
} 