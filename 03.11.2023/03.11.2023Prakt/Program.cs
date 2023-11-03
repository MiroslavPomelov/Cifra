namespace _03._11._2023Prakt
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Program program = new Program();
            program.GetSumAsync(22, 15);

            Console.ReadKey();
        }

        public async void GetSumAsync(int firstNumber, int secondNumber)
        {
            int result = 0;
            Console.WriteLine("Метод поиска стартовал!");

            await Task.Run(() =>
            {
                result = GetSum(firstNumber, secondNumber);
            });

            Console.WriteLine($"Сумма двух чисел: {result}");
        }

        public int GetSum(int firstNumber, int secondNumber)
        {
            Task.Delay(2000).Wait();
            return firstNumber + secondNumber;
        }
    }
}