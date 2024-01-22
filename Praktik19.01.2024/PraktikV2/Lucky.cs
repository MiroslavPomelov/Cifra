using Praktik19._01._2024;

namespace PraktikV2
{
    public class Lucky
    {
        public decimal GetLuckyNumber(User user, int userNumber)
        {
            int luckyNumber = 0;
            Random random = new Random();
            luckyNumber = random.Next(1, 4);
            if (userNumber == luckyNumber)
            {
                user.Money = user.Money * 3;
                Console.WriteLine($"Вы угадли! Ваш баланс = {user.Money}"); 
            }
            else
            {
                Console.WriteLine($"К сожалению вы не угадали! Ваш баланс = {user.Money}");
            }
            return user.Money;
        }
    }
}
