using System.Drawing;

namespace AnonT
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var values1 = new Values1(); //Values1
            var values2 = new Values2();
            var values3 = new Values3();
            // В полях var не используется
        }
    }

    class Values1
    {
        public string name;
        public int age;
        public Color eyeColor;
        public char sex;
    }

    class Values2
    {
        public string name;
        public int age;
        public Color eyeColor;
        public char sex;
    }

    class Values3
    {
        public string name;
        public int age;
        public Color eyeColor;
        public char sex;
    }
}