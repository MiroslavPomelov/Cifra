

namespace Praktik19._01._2024
{
    public class Videocard : Good
    {
        public decimal Discount { get; set; } = 1;
        public Videocard(string? name, int quantity, decimal price) : base(name, quantity, price)
        {
            price = price * Discount;
        }
    }
}
