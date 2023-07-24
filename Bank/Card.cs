using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    internal class Card
    {
        public string? Name { get; private set; }
        public int Number { get; private set; }
        public Schet? SchetCard { get; private set; }

        public Card(string? name, int number, Schet? schetCard)
        {
            Name = name;
            Number = number;
            SchetCard = schetCard;
        }
    }
}
