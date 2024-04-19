using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Model.Data.DataBaseEntities
{
    internal class Seat
    {
        public int Id { get; set; }
        public int Shedule_Id { get; set; }
        public int Carriage_Id { get; set; }
        public int Seat_Number { get; set; }
        public decimal Price { get; set; }
        public int Booked { get; set; }
        public int User_Id { get; set; }
        public string Data { get; set; }

    }
}
