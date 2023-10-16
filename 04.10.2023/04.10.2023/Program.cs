using System.Security.Cryptography;

namespace _04._10._2023
{

    //DZ 11

    enum Condition
    {
        bad,
        well,
        good,
        exelent
    }

    enum Status
    {
        onWork,
        offWork,
        onVacation
    }
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }

    class Automibile
    {
        public string Mark { get; set; }

        public long Number { get; set; }

        public Condition Condition { get; set; }

        public void SetCondition(Condition condition)
        {
            Condition = condition;
        }

    }

    class Driver
    {
        public Driver(string name, Status currentStatus)
        {
            Name = name;
            CurrentStatus = currentStatus;
        }

        public string Name { get; set; }
        public Status CurrentStatus { get; set; }

        public void SetAndOrder()
        {

        }

        public void MarkTripAsOvered()
        {

        }
    }

    class Operator
    {
        public void TripDistribition(Driver driver, Trip trip)
        {

        }

        public void FireDriver(Driver driver)
        {

        }
    }

    public class Trip
    {
        public long TripNumber { get; set; }
        public DateTime TripStartTime { get; set; }
        public DateTime TripEndTime { get; set; }
        public string TripDescription { get; set; }
    }
}