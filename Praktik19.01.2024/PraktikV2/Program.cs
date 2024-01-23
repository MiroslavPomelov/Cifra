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

            UI.UserUi(newUser, lucky, good, coolingSystem);

        }
    }
}