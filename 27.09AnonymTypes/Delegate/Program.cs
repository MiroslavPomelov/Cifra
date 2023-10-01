namespace Delegate
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Func func = Sum;
            func += Substract;
            func += Muliplication;
            func += Divide;

            func.Invoke(5, 10);// Проверка на null
        }

        public static int Sum(int x, int y)
        {
            Console.WriteLine(x + y);
            return x + y;
        }
        public static int Substract(int x, int y)
        {
            Console.WriteLine(x - y);
            return x - y;
        }
        public static int Muliplication(int x, int y)
        {
            Console.WriteLine(x * y);
            return x * y;
        }
        public static int Divide(int x, int y)
        {
            Console.WriteLine(x / y);
            return x / y;
        }

        public delegate int Func(int x, int y);
    }
}

