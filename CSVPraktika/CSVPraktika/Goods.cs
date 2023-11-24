using CsvHelper.Configuration.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSVPraktika
{
    public class Goods 
    {
        [Name("Name")]
        public string? Name { get; set; }
        [Name("Quantity")]
        public int Quantity { get; set; }
        [Name("Price")]
        public int Price { get; set; }
        [Name("Description")]
        public string? Description { get; set; }

    }
}
