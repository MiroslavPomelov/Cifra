using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Turniket
{
    enum TypeOfTicket
    {
        Разовый,
        Проездной,
        СоциальнаяКарта,
        ТранспортнаяКарта
    }
    internal class BusTicket
    {
        private int number;
        private DateOnly srok;
        private TypeOfTicket type;
        private bool isValid;

        public BusTicket(int number, DateOnly srok, TypeOfTicket type, bool isValid)
        {
            this.number = number;
            this.srok = srok;
            this.type = type;
            this.isValid = isValid;
        }
        public int getNumber()
        {
            return number;
        }
        public DateOnly getSrok()
        {
            return srok;
        }
        public TypeOfTicket getType()
        {
            return type;
        }
        public bool isTicketValid()
        {
            return isValid;
        }
        public void setValid()
        {
            isValid=false;
        }
        public void Print()
        {
            Console.WriteLine("Срок действия:" + this.srok + ", Вид билета:" + this.type);
        }
    }
}
