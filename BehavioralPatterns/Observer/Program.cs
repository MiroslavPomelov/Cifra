namespace Observer
{
    class Program
    {
        static void Main(string[] args)
        {
            Order order = new Order();
            Waiter firstWaiter = new Waiter("Валерий", order);
            OrderPanel panel = new OrderPanel(order);
            // имитация заказов
            order.СustomerMakesAnOrder();
        }
    }

    interface IObserver
    {
        void Update(object ob);
    }

    interface IObservable
    {
        void RegisterObserver(IObserver o);
        void RemoveObserver(IObserver o);
        void NotifyObservers();
    }

    class Order : IObservable
    {
        private OrderInfo _info; // информация о заказе
        private List<IObserver> _observers;

        public Order()
        {
            _observers = new List<IObserver>();
            _info = new OrderInfo();
        }

        public void RegisterObserver(IObserver o)
        {
            _observers.Add(o);
        }

        public void RemoveObserver(IObserver o)
        {
            _observers.Remove(o);
        }

        public void NotifyObservers()
        {
            foreach (IObserver observer in _observers)
            {
                observer.Update(_info);
            }
        }

        public void СustomerMakesAnOrder()
        {
            var drinks = new List<string>()
            {
                "Кола", "Фанта", "Спрайт", "Вода", "Кофе", "Чай"
            };
            var food = new List<string>()
            {
                "Картошка фри", "", "Спрайт", "Вода", "Кофе", "Чай"
            };


            while (true)
            {
                Random rnd = new Random();
                _info.Drink = (rnd.Next(10), drinks[rnd.Next(drinks.Count)]);
                _info.Food = (rnd.Next(10), food[rnd.Next(drinks.Count)]);
                NotifyObservers();

                Thread.Sleep(10000);
                Console.Clear();
            }
        }
    }

    class OrderInfo
    {
        public string OrderNumber { get; set; }
        public (int, string) Food { get; set; }
        public (int, string) Drink { get; set; }

        public OrderInfo()
        {
            DateTime time = DateTime.Now;
            OrderNumber = $"{time.Day}{time.Hour}{time.Minute}";
        }
    }

    class OrderPanel : IObserver
    {
        private IObservable _order;

        public OrderPanel(IObservable order)
        {
            _order = order;
            _order.RegisterObserver(this);
        }
        public void Update(object ob)
        {
            OrderInfo orderInfo = (OrderInfo)ob;

            Console.WriteLine("\n\n>>------------------------Табло------------------------<<");
            Console.WriteLine($"Создан заказ №{orderInfo.OrderNumber}\nВ заказе:");
            Console.WriteLine($"Еда: {orderInfo.Food.Item2} Количество: {orderInfo.Food.Item1}");
            Console.WriteLine($"Напитки: {orderInfo.Drink.Item2} Количество: {orderInfo.Drink.Item1}");
            Console.WriteLine(">>-----------------------------------------------------<<");
        }
    }

    class Waiter : IObserver
    {
        private IObservable _order;
        private string _name { get; set; }

        public Waiter(string name, IObservable order)
        {
            _name = name;
            _order = order;
            _order.RegisterObserver(this);
        }
        public void Update(object ob)
        {
            OrderInfo orderInfo = (OrderInfo)ob;

            Console.WriteLine($"Официанту <{_name}>\nНазначается заказ: {orderInfo.OrderNumber}\nВ заказе:");
            Console.WriteLine($"Еда: {orderInfo.Food.Item2} Количество: {orderInfo.Food.Item1}");
            Console.WriteLine($"Напитки: {orderInfo.Drink.Item2} Количество: {orderInfo.Drink.Item1}");
        }
    }
}