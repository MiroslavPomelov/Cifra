﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Model.Data.DataBaseEntities
{
    internal class AvaliableSeat
    {
        public int Id { get; set; }
        public string Departure { get; set; } = null!;
        public string Destination { get; set; } = null!;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string TrainName { get; set; }
        public int TrainNumber { get; set; }
        public short CarriageNumber { get; set; }
        public string Class {  get; set; } = null!;
        public short SeatNumber { get; set; }
        public decimal Price { get; set; }
        public byte Booked {  get; set; }
        public string? Login { get; set; }
        public string Data { get; set; }

        public AvaliableSeat(int id, string departure, string destination, DateTime departureTime, DateTime arrivalTime, string trainName, int trainNumber, short carriageNumber, string @class, short seatNumber, decimal price, byte booked, string login, string data)
        {
            Id = id;
            Departure = departure;
            Destination = destination;
            DepartureTime = departureTime;
            ArrivalTime = arrivalTime;
            TrainName = trainName;
            TrainNumber = trainNumber;
            CarriageNumber = carriageNumber;
            Class = @class;
            SeatNumber = seatNumber;
            Price = price;
            Booked = booked;
            Login = login;
            Data = data;
        }
    }
}
