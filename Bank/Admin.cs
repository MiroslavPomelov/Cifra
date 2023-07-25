using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    internal class Admin
    {
        public string Name { get; set; }

        public void BlockCard(Card card)
        {
            card.IsBlocked = true; 
        }

        public void UnBlockCard(Card card)
        {
            card.IsBlocked = false;
        }
    }
}
