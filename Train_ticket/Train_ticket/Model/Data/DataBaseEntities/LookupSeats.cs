using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Model.Data.DataBaseEntities
{
    internal class LookupSeats
    {
        public string Departure {  get; set; }
        public string Destination { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }

        public LookupSeats(string departure, string destination, DateTime departureTime, DateTime arrivalTime)
        {
            Departure = departure;
            Destination = destination;
            DepartureTime = departureTime;
            ArrivalTime = arrivalTime;
        }
    }
}
