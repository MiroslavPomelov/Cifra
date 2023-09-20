namespace PolymorphPrakt20._09
{
    // Отношения классов
    internal class Program
    {
        static void Main(string[] args)
        {
            Car myCar = new Car();
            myCar.StartCar();
        }
    }

    class Engine
    {
        public void Start()
        {
            Console.WriteLine("Дивгатель запущен");
        }
    }

    class Car
    {
        private Engine engine;

        public Car()
        {
            engine = new Engine();
        }

        public void StartCar()
        {
            engine.Start();
            Console.WriteLine("Автомобиль начал движение");
        }
    }
}