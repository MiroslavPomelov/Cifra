namespace Repeat08._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }

    class Passenger
    {
        public Order PassengerOrder { get; set; }
        public void MarkOrder(DateTime time)
        {
            PassengerOrder = new Order(time);
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

        public Cassier(List<Train> trainsList)
        {
            _trainsList = new List<Train>
            {
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
                new Train(new DateTime(2023, 10, 12), 2000.0m, new List<string>(){"Moscow","Kotlass - south", "Vorkuta"}),
            };
        }


        public Train FindTrain(Order order)
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
    }
}