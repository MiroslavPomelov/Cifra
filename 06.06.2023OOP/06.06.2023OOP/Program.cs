namespace _06._06._2023OOP
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Utils utils = new Utils(0);

            for (int i = 0; i < 1000000; i++)
            {
                utils.Generator(i);
            }
            Console.WriteLine("Ок!");
        }
    }

    class Utils
    {
        public int someValue;

        public Utils(int x)
        {
            someValue = x;
        }

        ~Utils()
        {
            Console.WriteLine($"Объект был удален при значении x = {someValue}");
        }

        public void Generator(int x)
        {
            Utils utils = new Utils(x);
        }
    }
}