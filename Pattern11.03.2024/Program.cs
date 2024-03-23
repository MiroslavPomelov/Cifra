namespace Pattern11._03._2024
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Bread bread = new Bread();

            
        }
    }

    public abstract class Product
    {
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Weight { get; set; }

        public void DisplayInfo()
        {
            Console.WriteLine("...");
        }
    }

    public class Oven
    {
        public void Heat(Product product)
        {
            Console.WriteLine("Печь нагрета" + product);
        }

        public void Input(Product product)
        {
            Console.WriteLine("Тесто в печи" + product);
        }

        public void Output(Product product)
        {
            Console.WriteLine("Можно доставать" + product);
        }
    }

    public class Bread : Product
    {

    }
}