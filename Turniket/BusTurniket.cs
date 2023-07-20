using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Turniket
{
    internal class BusTurniket
    {

        public bool IsValid(DateOnly date,BusTicket ticket)
        {

            if (ticket.getType() == TypeOfTicket.Разовый && ticket.isTicketValid())
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
                ticket.setValid();
                Open(ticket);
                return false;
            }
        }
      
        private void Open(BusTicket ticket)
        {
            if (ticket.isTicketValid()) Console.WriteLine("Турникет открыт");
            else Console.WriteLine("Турникет закрыт – билет просрочен");
        }
    }
}
