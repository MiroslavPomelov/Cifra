using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP3
{
    internal class Train
    {
        private int numbervagon;
        private string clas;
        private int seats;

        public Train(int numbervagon, string clas, int seats)
        {
            this.numbervagon = numbervagon;
            this.clas = clas;
            this.seats = seats;
        }

        public int PassengerOff()
        {
            return 10;
        }

        public int TicketsOff()
        {
            return 16;
        }

        public int SeatsFree()
        {
            this.seats -= TicketsOff();
            this.seats += PassengerOff();
            return this.seats;
        }

        public void Print()
        {
            Console.WriteLine($"Свободных мест: {SeatsFree()}");
        }
        ~Train()
        {

        }
    }
}
