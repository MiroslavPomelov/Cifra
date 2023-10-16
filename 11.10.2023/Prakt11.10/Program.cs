using System.Security.Cryptography.X509Certificates;

namespace Prakt11._10
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Transport[] transports = new Transport[]
            {
                new Car(220,"Speed"),
                 new Car(150,"Standart"),
                  new Car(60,"Slow")
            };

            foreach (Car car in transports)
            {
                GetInfo(car);
            }

            //-------------------------


            //Cars sportCar = new Cars(120);
            //Cars car = new Cars(60);

            //Trains passangerTrain = new Trains(80, 6);
            //Trains freightTrain = new Trains(60, 30);

            //Plane fighter = new Plane(2430, 23000);
            //Plane boeing747 = new Plane(1000, 10000);

            //Transport<object>[] mc = new Transport<object>[6]
            //{
            //    new Transport<object>(sportCar),
            //    new Transport<object>(car),
            //    new Transport<object>(passangerTrain),
            //    new Transport<object>(freightTrain),
            //    new Transport<object>(fighter),
            //    new Transport<object>(boeing747)
            //};
        }
        private static void GetInfo<T>(T info) where T : Transport
        {
            Console.WriteLine($"Тип машины: {info.CarType} - {info.Speed} км.ч");
        }
    }

    class Transport
    {
        public double Speed { get; set; }
        public string CarType { get; set; }

        public Transport(double speed, string carType)
        {
            Speed = speed;
            CarType = carType;
        }
    }

    class Car : Transport
    {
        public Car(double speed, string carType) : base(speed, carType)
        {

        }
    }

    //-------------------------


    //struct Plane
    //{
    //    public int Speed { get; set; }
    //    public int MaxFlyHigh { get; set; }

    //    public Plane(int speed, int maxFlyHigh)
    //    {
    //        Speed = speed;
    //        MaxFlyHigh = maxFlyHigh;
    //    }
    //}



    //class Cars
    //{
    //    public int MaxSpeedCar { get; set; }

    //    public Cars(int maxSpeed)
    //    {
    //        MaxSpeedCar = maxSpeed;
    //    }
    //}

    //class Trains
    //{
    //    public int MaxSpeedTrain { get; set; }
    //    public int CarriageQuantity { get; set; }

    //    public Trains(int maxSpeed, int carriageQuantity)
    //    {
    //        MaxSpeedTrain = maxSpeed;
    //        CarriageQuantity = carriageQuantity;
    //    }
    //}

    //class Transport<T> where T: class
    //{
    //    public T SomeTransport { get; set;}

    //    public Transport(T someTransport)
    //    {
    //        SomeTransport = someTransport;
    //    }
    //}
}