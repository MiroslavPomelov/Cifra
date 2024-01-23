using Praktik19._01._2024;

namespace PraktikV2.Products
{
    public class Motherboard : Good
    {
        public Motherboard(string? name, int quantity, decimal price) : base(name, quantity, price)
        {

        }

        public override void GetDiscount(User user)
        {
            base.GetDiscount(user);
        }
    }
}
