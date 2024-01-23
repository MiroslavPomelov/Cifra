using Praktik19._01._2024;
using PraktikV2.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PraktikV2
{
    public static class UI
    {
        public static void UserUi(User newUser, Lucky lucky, Good good, CoolingSystem coolingSystem)
        {

            Dictionary<int, Good> goods = new Dictionary<int, Good>()
            {
                [1] = new Videocard("GTX 2080", 6, 35000),
                [2] = new CPU("Intel i7", 5, 15000),
                [3] = new Motherboard("Acer asdas", 7, 5000),
                [4] = new PowerUnit("Cougar asdad", 4, 6000),
                [5] = new CoolingSystem("DeepCool adcsa", 10, coolingSystem.GetDiscountOnCooling(newUser, 4200)),
                [6] = new Frame("DeepCool fjhjf", 3, 7000)
            };

            Console.WriteLine("Введите любое число от 1 до 3: ");
            int userNumber = int.Parse(Console.ReadLine()!);
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

                newUser.Money -= goods[userChoice].Price * goodQuantity;
                newUser.TotalSum += goods[userChoice].Price * goodQuantity;
                good.GetDiscount(newUser);

                Console.WriteLine($"Итого: {newUser.TotalSum}\nВаш баланс: {newUser.Money}\nДля продолжения нажмите любую кнопку...");
                Console.ReadKey();
            }

            void GetGoods()
            {
                Console.WriteLine();

                // Перенести в класс UI
                foreach (var item in goods)
                {
                    Console.WriteLine($"Список товаров:\n{item.Key}) {item.Value.Name} - {item.Value.Price} С учетом скидки: {item.Value.Price}");
                }
            }
        }
    }
}
