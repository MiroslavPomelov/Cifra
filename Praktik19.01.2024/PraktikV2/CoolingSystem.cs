

using Praktik19._01._2024;
using System.Diagnostics;

namespace PraktikV2
{
    public class CoolingSystem : Good
    {
        public CoolingSystem(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            Price = price * Discount;
        }

        public CoolingSystem()
        {
        }

      
    }
}
