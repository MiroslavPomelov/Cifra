using System.Diagnostics;
using Praktik19._01._2024;

namespace PraktikV2.Products
{
    public class PowerUnit : Good
    {
        public decimal Discount { get; set; }
        public PowerUnit(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            Discount = 0.5m;
            Price = price * Discount;
        }

        public PowerUnit()
        {
        }

        //Убрать!
        public virtual decimal GetDiscountOnPowerUnit(User user, decimal price)
        {
            price = price * Discount;
            return price;
        }

        //Переопределить базовый метод
    }
}
