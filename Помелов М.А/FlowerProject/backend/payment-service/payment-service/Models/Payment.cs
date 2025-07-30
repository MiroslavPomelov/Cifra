
using System;
using System.ComponentModel.DataAnnotations;

namespace payment_service.Models
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; }
        
        [Required]
        public decimal Amount { get; set; }
        
        [Required]
        public string Status { get; set; } = string.Empty;
        
        [Required]
        public string CardNumber { get; set; } = string.Empty;
        
        [Required]
        public string CardHolder { get; set; } = string.Empty;
        
        [Required]
        public string Expiry { get; set; } = string.Empty;
        
        [Required]
        public string Cvc { get; set; } = string.Empty;
        
        public string Currency { get; set; } = "RUB";
        public string Description { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}