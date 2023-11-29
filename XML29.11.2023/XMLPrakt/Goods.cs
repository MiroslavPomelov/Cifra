using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace XMLPrakt
{
    [Serializable]
    public class Goods
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }

        public Goods(string? name, string? description, decimal price)
        {
            Name = name;
            Description = description;
            Price = price;
        }

        public Goods()
        {

        }
    }
}
