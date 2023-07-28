using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FiguresProject
{
    internal class TriangleColor : Triangle
    {
        private string color;
        public string Color { get { return color; } set { color = value; } }

        public TriangleColor(string name, double a, double b, double c, string color) : base(name, a, b, c)
        {
            this.color = color;
        }
        public override double Area()
        {
            return base.Area();
        }
        public override double Area2
        {
            get => Area();
        }

        public override string? ToString()
        {
            return base.ToString() + $" Color: {Color}";
        }

        //public override string Print()
        //{
        //    return base.Print() + $" Color: {Color}";
        //}

    }
}
