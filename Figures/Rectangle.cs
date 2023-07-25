using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Figures
{
    internal class Rectangle : Figure
    {
        protected double x1;
        protected double y1;
        protected double x2;
        protected double y2;

        public Rectangle(string name, double x1, double y1, double x2, double y2) : base(name)
        {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
        public Rectangle() : this("Rectangle", 0, 0, 1, 1)
        {

        }

        public override void Display()
        {
            base.Display();
            Console.Write("Rectangle: x1={0:F2}, y1={1:F2}, x2={2:F2}, y2={3:F2}", x1, y1, x2, y2);
        }

        public double Area()
        {
            return Math.Abs(x1 - x2) * Math.Abs(y1 - y2);
        }
    }
}
