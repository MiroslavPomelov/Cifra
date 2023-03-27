namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {

            try
            {
                string line = Console.ReadLine();
                int value = int.Parse(line);
            }
            catch (Exception exc)
            {
                Console.WriteLine("Ошибка: " +exc.Message);
            }

            Console.ReadLine();
        }
    }
}