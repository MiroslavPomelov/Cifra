using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Figures
{
    internal class Figure
    {
        protected string name;

        public Figure(string name)
        {
            this.name = name;
        }

        public virtual void Display()
        {
            Console.WriteLine($"Figure name - {name}");
        }
    }
}
