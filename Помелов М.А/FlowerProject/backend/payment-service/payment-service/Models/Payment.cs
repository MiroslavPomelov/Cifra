using System.ComponentModel.DataAnnotations;

namespace payment_service.Models
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}