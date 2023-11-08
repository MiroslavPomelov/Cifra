namespace Repeat08._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Passenger me = new Passenger("Miroslav");
            me.MarkOrder(new DateTime(2023, 10, 12));

            Cassier newCassier = new Cassier();
            newCassier.MakeTickets(me.PassengerOrder, me);
        }
    }

    class Passenger
    {
        public Order PassengerOrder { get; set; }
        public string PassengerName { get; set; }
        public void MarkOrder(DateTime time)
        {
            PassengerOrder = new Order(time);
        }

        public Passenger(string name)
        {
            PassengerName = name;
        }
    }

    class Order
    {
        public DateTime Time { get; set; }


        public Order(DateTime time)
        {
            Time = time;
        }

    }

    class Train
    {
        public decimal Price { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public List<string> Stations { get; set; }

        public Train(DateTime departureTime, decimal price, List<string> stations)
        {
            DepartureTime = departureTime;
            ArrivalTime = DepartureTime.AddDays(5);
            Price = price;
            Stations = stations;
        }
    }

    class Cassier
    {
        private List<Train> _trainsList;
        private Dictionary<Train, List<Passenger>> _tickets = new Dictionary<Train, List<Passenger>>();

        public Cassier()
        {
            _trainsList = new List<Train>
            {
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
            };
        }

        private Train FindTrain(Order order)
        {
            foreach (Train traint in _trainsList)
            {
                if (order.Time == traint.DepartureTime)
                {
                    return traint;
                }
            }
            Console.WriteLine("Поезд не найден");
            return null;
        }

        public void MakeTickets(Order order, Passenger currentPassenger)
        {
            Train currentTrain = FindTrain(order);
            List<Passenger> tempList = _tickets[currentTrain];
            tempList.Add(currentPassenger);
            _tickets[currentTrain] = tempList;
        }
    }
}