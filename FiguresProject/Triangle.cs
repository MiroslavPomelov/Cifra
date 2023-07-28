using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FiguresProject
{
    internal class Triangle : Figure
    {
        private double a, b, c;
        public double A
        {
            get { return a; }
            set
            {
                if (value > 0)
                {
                    a = value;
                }
            }

        }
        public double B
        {
            get { return b; }
            set
            {
                if (value > 0)
                {
                    b = value;
                }
            }
        }
        public double C
        {
            get { return c; }
            set
            {
                if (value > 0)
                {
                    c = value;
                }
            }
        }

        public Triangle(string name, double a, double b, double c) : base(name)
        {
            this.a = a; this.b = b; this.c = c;
        }

        public override double Area2
        {
            get => Area();
        }

        public override double Area()
        {
            double pp = (a + b + c) / 2;
            return Math.Sqrt(pp * (pp - a) * (pp - b) * (pp - c));
        }

        //public override string Print()
        //{
        //    return base.Print() + $"a:{a} b:{b} c:{c}";
        //}

        public override string? ToString()
        {
            return base.ToString() + $"a:{a} b:{b} c:{c}";
        }
    }
}
