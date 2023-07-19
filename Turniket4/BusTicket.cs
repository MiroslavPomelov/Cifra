using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Turniket4
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

        public void Print()
        {
            Console.WriteLine("Срок действия: " + this.srok + ", Вид билета: " + this.type);
        }

        public DateOnly getSrok()
        {
            return srok;
        }
    }
}
