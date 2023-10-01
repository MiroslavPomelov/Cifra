namespace Kortezh
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var tuple = (5, 10); //Кортеж

            (int, int, string) someTuple = (50, 100, "name");
            Console.WriteLine(someTuple.Item3);


        }
    }
}