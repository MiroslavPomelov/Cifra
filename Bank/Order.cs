using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    internal class Order
    {
        public Client? Client { get; set; }
        public string? Name { get; set; }
        public decimal? Total { get; set; }
    }
}
