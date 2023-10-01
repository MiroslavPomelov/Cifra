namespace Abstract22._09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Rectangle rectangle = new Rectangle(10, 20);
            Triangle triangle = new Triangle(10, 15);
            Console.WriteLine(rectangle.Square());
            Console.WriteLine(triangle.Square());
        }
    }

    abstract class Figures
    {
        public int Basement { get; set; }
        public Figures(int basement)
        {
            Basement = basement;
        }
        public abstract double Square();
    }

    class Rectangle : Figures
    {
        public int Side { get; set; }
        public Rectangle(int basement, int side) : base(basement)
        {
            Side = side;
        }

        public override double Square()
        {
            return Basement * Side;
        }
    }

    class Triangle : Figures
    {
        public int Height { get; set; }
        public Triangle(int basement, int height) : base(basement)
        {
            Height = height;
        }

        public override double Square()
        {
            return Height * Basement;
        }
    }
}