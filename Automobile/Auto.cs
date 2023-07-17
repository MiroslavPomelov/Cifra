using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Automobile
{
    internal class Auto
    {
        private string? marka;
        private float volume;
        private float rasxod;

        public Auto(string marka, float volume, float rasxod)
        {
            this.marka = marka;
            this.volume = volume;
            this.rasxod = rasxod;
        }
        public void AddFuel(float f)
        {
            volume += f;
        }
        public void Go(float km)
        {
            volume -=(km * rasxod) / 100;
        }
        public float Total()
        {
            return (volume / rasxod) * 100;
        }
        public void Print()
        {
            Console.WriteLine($"{volume}");
        }
        ~Auto()
        {
            marka = null;
        }
    }
}
