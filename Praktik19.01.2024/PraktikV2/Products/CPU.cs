namespace PraktikV2.Products
{
    public class CPU : Good
    {
        public decimal Discount { get; set; } = 1;
        public CPU(string? name, int quantity, decimal price) : base(name, quantity, price)
        {
            price = price * Discount;
        }
    }
}
