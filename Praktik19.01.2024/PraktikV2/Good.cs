

using PraktikV2;

namespace Praktik19._01._2024
{
    public class Good
    {
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public decimal? Price { get; set; }
        public decimal? Discount { get; set; }
        public Good(string? name, int quantity, decimal? price)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
            Discount = 1;
        }

        public Good(){}

        public virtual decimal GetDiscount(User user)
        {
            decimal sum = 1;
            if (user.TotalSum > 10000)
            {
                sum = 0.95m;
            }
            if (user.TotalSum > 50000)
            {
                sum = 0.9m;
            }
            return sum;
        }

        public virtual void GetDiscountOnCooling(User user, CoolingSystem coolingSystem)
        {
            if (user.Age > 30)
            {
                Discount = 0.75m;
            }
        }
    }
}
