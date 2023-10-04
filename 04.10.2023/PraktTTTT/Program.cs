using System.Drawing;

namespace PraktTTTT
{
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }


    public abstract class People<TCharcteristics, TSex, TRace, TColor>
    {
        public abstract TCharcteristics Height { get; set; }
        public abstract TCharcteristics Weight { get; set; }
        public abstract TSex Sex { get; set; }
        public abstract TRace Race { get; set; }
        public abstract TColor EyeColor { get; set; }
    }

    public class Person : People<double, char, string, Color>
    {
        public override double Height { get; set; }
        public override double Weight { get; set; }
        public override char Sex { get; set; }
        public override string Race { get; set; }
        public override Color EyeColor { get; set; }


    }


}