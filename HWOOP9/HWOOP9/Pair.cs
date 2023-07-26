using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP9
{
    internal class Pair
    {
        public int X { get; set; }
        public int Y { get; set; }


        public void Change(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }

        public double Pr()
        {
           return this.X * this.Y;
        }
    }
}
