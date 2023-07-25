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
        public bool IsBlocked { get; set; }

        public Card(string? name, int number, Schet? schetCard)
        {
            Name = name;
            Number = number;
            SchetCard = schetCard;
        }

        public void Add(decimal s)
        {
            if (IsBlocked == false)
                SchetCard!.Summa += s;
            else
            {
                Console.WriteLine("Карта заблокирована!");
            }
        }
        public void Sub(decimal? s)
        {
            if (IsBlocked == false)
            {
                if (SchetCard!.Summa >= 0)
                {
                    SchetCard!.Summa -= s;
                }
                else
                {
                    Console.WriteLine("Операция не возможна!");
                }
            }
            else
            {
                Console.WriteLine("Карта заблокирована!");
            }
        }
    }
}
