using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FiguresProject
{
    abstract class Figure
    {
        private string name;
        public string Name { get; set; }

        protected Figure(string name)
        {
            Name = name;
        }

        public abstract double Area();
        public abstract double Area2 { get; }

        public override string? ToString()
        {
            return Name;
        }
        //public virtual string Print() => Name;

    }
}
