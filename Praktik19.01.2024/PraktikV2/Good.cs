

namespace Praktik19._01._2024
{
    public class Good
    {
        public string? Name { get; set; }

        public int Quantity { get; set; }
        public decimal? Price { get; set; }

        public decimal? Discount{ get; set; }
        public Good(string? name, int quantity, decimal? price)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
            Discount = 1;
        }
        public decimal GetDiscount(User user)
        {
            return (decimal)(user.Money * Discount);
        }
    }
}
