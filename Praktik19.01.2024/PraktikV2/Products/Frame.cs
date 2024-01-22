namespace PraktikV2.Products
{
    public class Frame : Good
    {
        public Frame(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            price = price * Discount;
        }
    }
}
