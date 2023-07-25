using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Figures
{
    internal class RectangleColor : Rectangle
    {
        protected int color = 0;

        public RectangleColor(string name, double x1, double y1, double x2, double y2, int color) : base(name, x1, y1, x2, y2)
        {
            this.color = color;
        }
        public RectangleColor() : this("RectangleColor", 0, 0, 1, 1, 0) { }
        public override void Display()
        {
            base.Display();
            Console.WriteLine();
            Console.WriteLine("Color={0}", color);
        }
        public new double Area()
        {
            return base.Area();
        }
    }
}
