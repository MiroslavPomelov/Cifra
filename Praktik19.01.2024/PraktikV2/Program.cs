using Praktik19._01._2024;

namespace PraktikV2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введите ваше имя и баланс и возраст:");
            //string userName = Console.ReadLine();
            //decimal userSum = decimal.Parse(Console.ReadLine());
            //int userAge = int.Parse(Console.ReadLine());

            User newUser = new(Console.ReadLine(), decimal.Parse(Console.ReadLine()), int.Parse(Console.ReadLine()));

            //List<Good> goods = new List<Good>()
            //{
            //    new Videocard("GTX 2080", 6, 35000),
            //    new CPU("Intel i7", 5, 15000),
            //    new Motherboard("Acer asdas", 7, 5000)
            //};

            Dictionary<int, Good> goods = new Dictionary<int, Good>()
            {
                [1] = new Videocard("GTX 2080", 6, 35000),
                [2] = new CPU("Intel i7", 5, 15000),
                [3] = new Motherboard("Acer asdas", 7, 5000),
                [4] = new PowerUnit("Cougar asdad", 4, 6000),
                [5] = new CoolingSystem("DeepCool adcsa", 10, 4200)
            };
            int count = 1;
            foreach (var item in goods)
            {
                Console.WriteLine($"Список товаров:\n{count}) {item.Value.Name} - {item.Value.Price} С учетом скидки: {}");
                count++;
            }

            int choice = 1;
            while (choice != 0)
            {
                Console.WriteLine("Выберите номер товара для выхода нажмите 0:");
                choice = int.Parse(Console.ReadLine());
                decimal sum = 0;

                foreach (var item in goods)
                {
                    switch (choice)
                    {
                        case 1:
                            newUser.Money -= goods[1].Price.Value;
                            sum += goods[1].Price.Value;
                            break;
                        case 2:
                            newUser.Money -= goods[2].Price.Value;
                            sum += goods[2].Price.Value;
                            break;
                        case 3:
                            newUser.Money -= goods[3].Price.Value;
                            sum += goods[3].Price.Value;
                            break;
                            case 4:
                            newUser.Money -= goods[4].Price.Value;
                            sum += goods[4].Price.Value;
                            break;
                        case 5:
                            newUser.Money -= goods[5].Price.Value;
                            sum += goods[5].Price.Value;
                            break;
                    }
                    if (newUser.Money > 0)
                    {
                        if (sum >= 10000)
                        {
                            sum -= item.Value.Price.Value * 0.05m;
                        }
                        if (sum >= 35000)
                        {
                            sum -= item.Value.Price.Value * 0.1m;
                        }

                    }
                    else
                    {
                        Console.WriteLine("Выш баланс не позволяет");
                        break;
                    }
                    break;
                }

                Console.WriteLine($"Итого: {sum}\nВаш баланс: {newUser.Money}");
            }
        }
    }
}