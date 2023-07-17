using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainProject
{
    internal class Train
    {
        private string dest;
        private int number;
        private TimeOnly time;

        public Train(string dest, int number, int h, int m)
        {
            this.dest = dest;
            this.number = number;
            this.time = new TimeOnly(h, m);
        }
        public string Print()
        {
            return $"{dest} {number} {time.ToString()}";
        }
        public int getNumber()
        {
            return number;
        }
        public string getDest()
        {
            return dest;
        }
    }
}
