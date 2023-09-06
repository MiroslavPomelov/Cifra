namespace _06._06._2023OOP
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Utils utils = new Utils {name = "Qwerty", age = 24 };


        }
    }

    class Utils
    {
        public string name;
        public int age;

        public Utils()
        {
            name = "";
            age = 0;
        }
    }
}

