using System.Xml.Linq;

namespace Polymorph20._09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Shape[] figures = new Shape[3];

            Circle circle = new Circle(5);
            Rectangle rectangle = new Rectangle(5, 10);
            Triangle triangle = new Triangle(5,10);

            figures[0] = circle;
            figures[1] = rectangle;
            figures[2] = triangle;

            for (int i = 0; i < figures.Length; i++)
            {
                Console.WriteLine(figures[i].Area());
                Console.WriteLine(figures[i].Perimetr());
                Console.WriteLine(figures[i].Name);
            }
        }
    }

    class Shape
    {
        private string _name;
        public string Name 
        { 
            get { return _name; }
            set { _name = value; }
        }

        public virtual double Area()
        {
            return 0.0;
        }

        public virtual double Perimetr()
        {
            return 0.0;
        }
    }

    class Circle : Shape
    {
        private double _radius;
        public double Radius
        {
            get { return _radius; }
            set { _radius = value; }
        }

        public Circle(double radius)
        {
            _radius = radius;
        }
        public override double Area()
        {
            return Math.PI * Math.Pow(_radius, 2);
        }

        public override double Perimetr()
        {
            return 2 * Math.PI * _radius;
        }
    }

    class Rectangle : Shape
    {
        public double _width;
        public double Width
        {
            get { return _width; }
            set { _width = value; }
        }
        private double _height;
        public double Height
        {
            get { return _height; }
            set { _height = value; }
        }

        public Rectangle(double width, double height)
        {
            _width = width;
            _height = height;
        }

        public override double Area()
        {
            return _width * _height;
        }

        public override double Perimetr()
        {
            return _width * 2 + 2 * _height;
        }
    }

    class Triangle : Shape
    {
        public double _base;
        public double Base
        {
            get { return _base; }
            set { _base = value; }
        }
        private double _height;

        public Triangle(double base1, double height)
        {
            Base = base1;
            Height = height;
        }

        public double Height
        {
            get { return _height; }
            set { _height = value; }
        }

        public override double Area()
        {
            return _base * _height / 2;
        }

        public override double Perimetr()
        {
            return _base + (Math.Sqrt(Math.Pow(_base / 2, 2) + Math.Pow(_height, 2))) * 2;
        }
    }
}