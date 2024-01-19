

namespace Praktik19._01._2024
{
    public class Good
    {
        public string? Name { get; set; }

        public int Quantity { get; set; }
        public decimal? Price { get; set; }

        public Good(string? name, int quantity, decimal? price)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
        }

        //public Good()
        //{
        //}
    }
}
