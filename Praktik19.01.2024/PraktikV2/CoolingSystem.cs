

using Praktik19._01._2024;

namespace PraktikV2
{
    public class CoolingSystem : Good
    {
        public decimal Discount { get; set; } = 1;
        public CoolingSystem(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            price = price * Discount;
        }
    }
}
