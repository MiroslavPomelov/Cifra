namespace _01._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Thread firstThread = new Thread(new ParameterizedThreadStart(Printer)); // Сразу указывает делегат, параметры в потоке
            Thread secondThread = new Thread(Printer);
            Thread thirdThread = new Thread(message => { Console.WriteLine(message); });

            firstThread.Start(("asda"));
            secondThread.Start("asda");
            thirdThread.Start(("asda"));

        }

        //public static void Printer(object obj)
        //{

        //    if (obj is int[])
        //    {
        //        foreach (int item in (int[])obj)
        //        {
        //            Console.WriteLine(item);
        //        }
        //    }
        //    else if (obj is Car)
        //    {
        //        Car car = (Car)obj;
        //        Console.WriteLine($"Название: {car.CarName}\nТип: {car.CarType}\nСкорость: {car.Speed}");
        //    }
        //    else
        //    {
        //        Console.WriteLine(obj);
        //    }

        public static void Printer(object obj)
        {
            Console.WriteLine(obj);
        }
    }

    class Car
    {
        public string CarName { get; set; }
        public string CarType { get; set; }
        public double Speed { get; set; }

        public Car(string carName, string carType, double speed)
        {
            CarName = carName;
            CarType = carType;
            Speed = speed;
        }
    }
}