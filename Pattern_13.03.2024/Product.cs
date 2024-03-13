using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pattern_13._03._2024
{
    public abstract class Product
    {
        protected string _name;
        protected string _description;

        protected Product(string name, string description)
        {
            _name = name;
            _description = description;
        }
    }
}
