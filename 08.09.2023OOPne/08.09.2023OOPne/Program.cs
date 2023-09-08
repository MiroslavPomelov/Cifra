using System.ComponentModel.Design;

namespace _08._09._2023OOPne
{
    internal class Program
    {
        static void Main(string[] args)
        {

            //AutoEngine autoEngine = new AutoEngine("Lada", 4.4, 8);

            People man = new People();

            man[0].Name = "Qwerty";

        }

        class Person
        {
            public string Name { get; set; }
        }

        class People
        {
            private Person[] data;

            public People()
            {
                data = new Person[0];
            }

            public Person this[int index]
            {
                get
                {
                    return data[index];
                }
                set
                {
                    data[index] = value;
                }
            }
        }

        //class AutoEngine
        //{
            //public string _car { get; private set; }
            //private double _tankVolume;
            //private double _fuelConsumption;
            //private double _currentFuelRemaining;

            //public double FuelConsumptionRemaining
            //{
            //    get { return _fuelConsumption; }
            //}


            //public AutoEngine(string car, double volume, int fuelConsumption)
            //{
            //    _car = car;
            //    _tankVolume = volume;
            //    _fuelConsumption = fuelConsumption;
            //}

            //public void Refueling(int fuel)
            //{
            //    if (fuel + _currentFuelRemaining > _tankVolume)
            //    {
            //        throw new Exception();
            //    }
            //    _currentFuelRemaining += fuel;
            //}

            //public void FuelConsumption(double distance)
            //{
            //    if (_currentFuelRemaining - distance * _fuelConsumption / 100 => 0)
            //    {
            //        _currentFuelRemaining -= (distance * _fuelConsumption) / 100;
            //    }
            //    else 
            //    {
            //        Console.WriteLine("Вы доехали");
            //    }

            //}

            //public void Print()
            //{

            //}
        //}
    }




}