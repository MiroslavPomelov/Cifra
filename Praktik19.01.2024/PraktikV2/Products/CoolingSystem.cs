using Praktik19._01._2024;
using System.Diagnostics;

namespace PraktikV2.Products
{
    public class CoolingSystem : Good
    {
        public CoolingSystem(string? name, int quantity, decimal? price) : base(name, quantity, price)
        {
            Price = price * Discount;
        }

        public CoolingSystem()
        {
        }

        public virtual decimal GetDiscountOnCooling(User user, decimal price)
        {
            if (user.Age > 30)
            {
                price = 0.75m * price;
            }
            return price;
        }

        /// <summary>
        /// Сделать нормальное переопределение метода!
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public override decimal GetDiscount(User user)
        {
            return base.GetDiscount(user);
        }
    }
}
