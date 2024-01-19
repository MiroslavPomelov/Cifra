
using Praktik19._01._2024;
namespace PraktikV2
{
    public class Frame : Good
    {
        public decimal Discount { get; set; } = 1;

        public Frame(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            price = price * Discount;
        }
    }
}
