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
        public ushort Seat_Number { get; set; }
        public decimal Price { get; set; }
        public byte Booked { get; set; }
        public int User_Id { get; set; }
        public string Data { get; set; }

        public Seat(int shedule_Id, int carriage_Id, ushort seat_Number, decimal price, byte booked, int user_Id, string data)
        {
            Shedule_Id = shedule_Id;
            Carriage_Id = carriage_Id;
            Seat_Number = seat_Number;
            Price = price;
            Booked = booked;
            User_Id = user_Id;
            Data = data;
        }
    }
}
