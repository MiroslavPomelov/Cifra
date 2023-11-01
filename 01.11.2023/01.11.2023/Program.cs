namespace _01._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Thread firstThread = new Thread(Printer);
            Thread secondThread = new Thread(Printer);
            Thread thirdThread = new Thread(Printer);
            Thread fourthThread = new Thread(Printer);

            firstThread.Start(15);
            secondThread.Start("asda");
            thirdThread.Start(new Car("dodge","Mc",260));
            fourthThread.Start(new int[] { 1, 2, 3 });

        }

        public static void Printer(object obj)
        {

            if (obj is int[])
            {
                foreach (int item in (int[])obj)
                {
                    Console.WriteLine(item);
                }
            }
            else if (obj is Car)
            {
                Car car = (Car)obj;
                Console.WriteLine($"Название: {car.CarName}\nТип: {car.CarType}\nСкорость: {car.Speed}");
            }
            else
            {
                Console.WriteLine(obj);
            }
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