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
            List<DateTime> holidays = new List<DateTime>()
            {
                new DateTime(2024, 01, 07), 
                new DateTime(2024, 02, 14),
                new DateTime(2024, 03, 08),
                new DateTime(2024, 04, 18),
                new DateTime(2024, 05, 09),
                new DateTime(2024, 06, 01),
                new DateTime(2024, 07, 30),
                new DateTime(2024, 08, 09),
                new DateTime(2024, 09, 01),
                new DateTime(2024, 10, 31),
                new DateTime(2024, 11, 24),
                new DateTime(2024, 12, 31),
            };

            foreach (var holiday in holidays)
            {
                if (holidays.Contains(DateTime.Now.Date))
                { 
                   Discount = 0.8m; 
                }
            }

            if (user.TotalSum > 50000)
            {
                Discount -= 0.1m;
            }
            if (user.TotalSum > 10000)
            {
                Discount -= 0.05m;
            }

            Price *= Discount;
        }


    }
}
