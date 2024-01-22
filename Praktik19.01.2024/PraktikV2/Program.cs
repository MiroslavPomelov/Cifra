using Praktik19._01._2024;
using PraktikV2.Products;
namespace PraktikV2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите ваше имя, баланс и возраст: ");

            User newUser = new(Console.ReadLine(), decimal.Parse(Console.ReadLine()!), int.Parse(Console.ReadLine()!));
            Good good = new Good();
            Lucky lucky = new Lucky();
            CoolingSystem coolingSystem = new CoolingSystem();
            PowerUnit powerUnit = new PowerUnit();

            Console.WriteLine("Введите любое число от 1 до 3: ");
            int userNumber = int.Parse(Console.ReadLine()!);


            // Перенести в класс Ыещкфпу
            Dictionary<int, Good> goods = new Dictionary<int, Good>()
            {
                [1] = new Videocard("GTX 2080", 6, 35000),
                [2] = new CPU("Intel i7", 5, 15000),
                [3] = new Motherboard("Acer asdas", 7, 5000),
                [4] = new PowerUnit("Cougar asdad", 4, 6000),
                [5] = new CoolingSystem("DeepCool adcsa", 10, coolingSystem.GetDiscountOnCooling(newUser, 4200)),
                [6] = new Frame("DeepCool fjhjf", 3, 7000)
            };


            // Перенести в класс UI
            int userChoice = 1;
            int goodQuantity = 1;

            while (userChoice != 0 && newUser.Money > 0)
            {
                Console.Clear();
                newUser.Money = lucky.GetLuckyNumber(newUser, userNumber);
                GetGoods();
                Console.WriteLine("Выберите номер товара и количество для выхода нажмите 0:");
                userChoice = int.Parse(Console.ReadLine()!);
                goodQuantity = int.Parse(Console.ReadLine()!);




                good.GetDiscount(newUser);
                newUser.Money -= goods[userChoice].Price * goodQuantity;
                newUser.TotalSum += goods[userChoice].Price * goodQuantity;

                Console.WriteLine($"Итого: {newUser.TotalSum}\nВаш баланс: {newUser.Money}\nДля продолжения нажмите любую кнопку...");
                Console.ReadKey();
            }

            void GetGoods()
            {
                Console.WriteLine();
                //Перенести в класс товара
                //foreach (var holiday in holidays)
                //{
                //    if (nowDay == holiday.Date)
                //    {
                //        foreach (var item in goods)
                //        {
                //            good.Discount = 0.8m;
                //        }
                //    }
                //}
                // Перенести в класс UI
                foreach (var item in goods)
                {
                    Console.WriteLine($"Список товаров:\n{item.Key}) {item.Value.Name} - {item.Value.Price} С учетом скидки: {item.Value.Price}");
                }
            }
        }
    }
}