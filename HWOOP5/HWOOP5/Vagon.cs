using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP5
{
    enum ClasOfVagon
    {
        Первый,
        Бизнес,
        Комфорт,
        Эконом
    }
    internal class Vagon
    {
        public int Numbervgon { get; private set; }
        private ClasOfVagon Clas { get;  set; }

        private int seats;
        public int Seats
        {
            get { return seats; }
            set
            {
                if (value > 0)
                {
                    this.seats = value;
                }
            }
        }

        public Vagon(int numbervgon, ClasOfVagon clas, int seats)
        {
            Numbervgon = numbervgon;
            Clas = clas;
            Seats = seats;
        }

        public int PassengerOff()
        {
            return 8;
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
    }
}
