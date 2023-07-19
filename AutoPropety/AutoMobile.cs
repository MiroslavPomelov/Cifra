using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoPropety
{
    internal class AutoMobile
    {
        public string Name { get; private set; }
        private double fuel;
        public double Fuel
        {
            get { return fuel; }
            set
            {
                if (value > 0)
                {
                    this.fuel = value;
                }
            }
        }
        private double rashod;
        public double Reshod
        {
            get { return rashod; }
            private set
            {
                if (value > 0)
                {
                    this.rashod = value;
                }
            }
        }

        public AutoMobile(string name, double fuel, double reshod)
        {
            Name = name;
            Fuel = fuel;
            Reshod = reshod;
        }

        public void Go(double km)
        {
            fuel -= (km * rashod) / 100;
        }

        public double Total()
        {
            return (fuel / rashod) * 100;
        }

        public void Print()
        {
            Console.WriteLine($"{Total()}");
        }
    }
}
