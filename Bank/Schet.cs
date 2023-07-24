using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    internal class Schet
    {
        public long Id { get; private set; }
        public decimal Summa { get; set; }

        public Schet(long id)
        {
            Id = id;
            Summa = 0;
        }
        public void Add(decimal s)
        {
            Summa += s;
        }
        public void Sub(decimal s)
        {
            if (Summa >= 0)
            {
                Summa -= s;
            }
            else
            {
                Console.WriteLine("Операция не возможна!");
            }
        }
    }
}
