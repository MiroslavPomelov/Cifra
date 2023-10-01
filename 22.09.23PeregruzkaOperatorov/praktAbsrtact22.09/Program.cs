namespace praktAbsrtact22._09
{
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }

    abstract class Figure
    {
        private string _name;
        public Figure(string name)
        {
            _name = name;
        }

        public abstract double Area2 { get; set; }

        public abstract double Area();

        public virtual void Print()
        {
            Console.WriteLine(_name);
        }
    }

    class Triangle : Figure
    {
        private int _a;
        private int _b;
        private int _c;
        private int _d;

        public override double Area2 { get { return _a; } }

        public override double Area()
        {
            return _a;
        }

        public Triangle(int d, int a, int b, int c, int d)
        {
            _a = a;
            _b = b;
            _c = c;
            _d =d;
        }

        public void SetABC(int a, int b, int c)
        {
            _a = a;
            _b = b;
            _c = c;
        }
        public int GetABC(int a, int b, int c)
        {
            return _a;
            return _b;
        }

    }
}