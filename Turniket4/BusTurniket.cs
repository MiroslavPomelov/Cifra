using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Turniket4
{
    internal class BusTurniket
    {
        public bool IsValid(DateOnly date, BusTurniket ticket)
        {
            if (ticket.getType() == TypeOfTicket.Разовый && ticket.IsTicketValid())
            {
                ticket.Print();
                Open(ticket);
                ticket.setValid();
                return true;
            }
            else if (date <= ticket.getSrok())
            {
                ticket.Print();
                Open(ticket);
                return true;
            }
            else
            {
                ticket.Print();
                Open(ticket);
                ticket.setValid();
                return false;
            }
        }

        private void Open(BusTurniket ticket)
        {
            if (ticket.IsticketValid())
            {
                Console.WriteLine("Турникет открыт");
            }
            else
            {
                Console.WriteLine("Турникет закрыт, билет просрочен");
            }
        }
    }


    

}
