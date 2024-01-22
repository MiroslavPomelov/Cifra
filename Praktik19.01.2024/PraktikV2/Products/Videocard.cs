namespace PraktikV2.Products
{
    public class Videocard : Good
    {
        public Videocard(string? name, int quantity, decimal price) : base(name, quantity, price)
        {
            Price *= Discount;
        }
    }
}
