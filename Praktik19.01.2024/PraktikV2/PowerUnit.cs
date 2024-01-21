
using Praktik19._01._2024;
using System.Diagnostics;

namespace PraktikV2
{
    public class PowerUnit : Good
    {
        
        public PowerUnit(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            Price = price/2;
        }
    }
}
