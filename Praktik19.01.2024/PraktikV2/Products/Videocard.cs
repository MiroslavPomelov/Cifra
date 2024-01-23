using Praktik19._01._2024;

namespace PraktikV2.Products
{
    public class Videocard : Good
    {
        public Videocard(string? name, int quantity, decimal price) : base(name, quantity, price)
        {
            Price *= Discount;
        }

        public override void GetDiscount(User user)
        {
            base.GetDiscount(user);
        }
    }
}
