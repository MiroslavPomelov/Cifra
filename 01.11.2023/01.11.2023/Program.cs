namespace _01._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Thread firstThread = new Thread(Printer);
            Thread secondThread = new Thread(Printer);
            Thread thirdThread = new Thread(Printer);

            firstThread.Start(15);
            secondThread.Start("asda");
            thirdThread.Start(16.324234);

            Console.WriteLine($"Первичный поток ");

        }

        public static void Printer(object obj)
        {
            Console.WriteLine($"Вторичный поток {obj}");

        }
    }
}