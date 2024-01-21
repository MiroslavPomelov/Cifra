using Praktik19._01._2024;
using System.Security.Cryptography.X509Certificates;

namespace PraktikV2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите ваше имя, баланс и возраст: ");

            User newUser = new(Console.ReadLine(), decimal.Parse(Console.ReadLine()!), int.Parse(Console.ReadLine()!));
            Good good = new Good();
            CoolingSystem coolingSystem = new CoolingSystem();

            DateTime one = new DateTime(2025, 03, 8);

            coolingSystem.GetDiscountOnCooling(newUser, coolingSystem);

            List<Holiday> holidays = new List<Holiday>()
            {
                new Holiday("Рождество", new DateTime(2024, 01,7)),
                new Holiday(" День Святого Валентина", new DateTime(2024, 02,14)),
                new Holiday(" Международный женский день", new DateTime(2024, 03,8)),
                new Holiday(" Пасха", new DateTime(2024, 04,16)),
                new Holiday("День Победы", new DateTime(2024, 05,9)),
                new Holiday(" День рождения магазина", new DateTime(2024, 06,1)),
                new Holiday("Международный день дружбы", new DateTime(2024, 07,1)),
                new Holiday(" День рождения ОС Linux", new DateTime(2024, 08,9)),
                new Holiday(" День знаний", new DateTime(2024, 09,1)),
                new Holiday(" Хэллоуин", new DateTime(2024, 10,31)),
                new Holiday(" Черная пятница", new DateTime(2024, 11,29)),
                new Holiday(" Новый год", new DateTime(2024,12,31))
            };

            Dictionary<int, Good> goods = new Dictionary<int, Good>()
            {
                [1] = new Videocard("GTX 2080", 6, 35000),
                [2] = new CPU("Intel i7", 5, 15000),
                [3] = new Motherboard("Acer asdas", 7, 5000),
                [4] = new PowerUnit("Cougar asdad", 4, 6000),
                [5] = new CoolingSystem("DeepCool adcsa", 10, 4200),
                [6] = new Frame("DeepCool fjhjf", 3, 7000)
            };

            int choice = 1;
            while (choice != 0 && newUser.Money > 0)
            {
                GetGoods();
                Console.WriteLine("Выберите номер товара для выхода нажмите 0:");
                choice = int.Parse(Console.ReadLine()!);

                foreach (var item in goods)
                {
                    newUser.Money -= goods[choice].Price!.Value;
                    newUser.TotalSum += goods[choice].Price!.Value;
                    break;
                }
                Console.WriteLine($"Итого: {newUser.TotalSum}\nВаш баланс: {newUser.Money}");
            }

            void GetGoods()
            {
                Console.WriteLine();
                foreach (var holiday in holidays)
                {
                    if (one == holiday.Date)
                    {
                        foreach (var item in goods)
                        {
                            good.Discount = 0.8m;
                            //Console.WriteLine($"Список товаров:\n{item.Key}) {item.Value.Name} - {item.Value.Price} С учетом скидки: {item.Value.Price - ((item.Value.Price - (item.Value.Price * good.GetDiscount(newUser))) * 0.2m)}");
                        }
                    }
                    else
                    {
                        good.Discount = 1;
                    }
                }
                foreach (var item in goods)
                {
                    
                    Console.WriteLine($"Список товаров:\n{item.Key}) {item.Value.Name} - {item.Value.Price} С учетом скидки: {(item.Value.Price * good.GetDiscount(newUser))*(good.Discount)}");
                }
            }
        }
    }
}