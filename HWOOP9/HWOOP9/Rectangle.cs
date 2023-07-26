using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP9
{
    internal class Rectangle : Pair
    {
        public int X { get; set; }
        public int Y { get; set; }

        public new double Pr()
        {
            return this.X * this.Y;
        }

        public int Perimeter()
        {
            return 2 * (this.X + this.Y);
        }
    }
}
