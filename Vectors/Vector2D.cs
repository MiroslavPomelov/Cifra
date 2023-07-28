using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Vectors
{
    internal class Vector2D
    {
        public double X { get; set; }
        public double Y { get; set; }

        public static Vector2D operator +(Vector2D v1, Vector2D v2)
        {
            return new Vector2D() { X = v1.X + v2.X, Y = v1.Y + v2.Y };
        }

        public static Vector2D operator -(Vector2D v1, Vector2D v2)
        {
            return new Vector2D() { X = v1.X - v2.X, Y = v1.Y - v2.Y };
        }

        public static double operator *(Vector2D v1, Vector2D v2)
        {
            return v1.X * v2.X + v1.Y * v2.Y;
        }

        public double Abs()
        {
            return Math.Sqrt(this.X * this.X + this.Y * this.Y);
        }

        public double Cos(Vector2D v)
        {
            return (this * v) / (this.Abs() * v.Abs());
        }

        public void Print()
        {
            Console.WriteLine($"({X},{Y})");
        }
    }
}
