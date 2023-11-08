namespace Polymorph
{
    internal class Program
    {
        static void Main(string[] args)
        {
            First first = new First()
            {
                Value = 2,
            };
            Second second = new Second()
            {
                Value = 50,
            };

            Console.WriteLine(first + second);
        }
    }

    class First
    {
        public int Value { get; set; }

        public static int operator +(First current, Second other)
        {
            return current.Value + other.Value;
        }
    }

    class Second
    {
        public int Value { get; set; }
    }
}