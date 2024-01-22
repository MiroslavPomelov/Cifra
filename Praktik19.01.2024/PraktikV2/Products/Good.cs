using Praktik19._01._2024;
namespace PraktikV2.Products
{
    public class Good
    {
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; } = 1;
        public Good(string? name, int quantity, decimal price)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
            Discount = 1;
        }

        public Good() { }

        public virtual void GetDiscount(User user)
        {
            //Добавить проверку даты

            //Поменять местами
            if (user.TotalSum > 10000)
            {
                Discount -= 0.05m;
            }
            if (user.TotalSum > 50000)
            {
                Discount -= 0.1m;
            }

            Price *= Discount;
        }


    }
}
