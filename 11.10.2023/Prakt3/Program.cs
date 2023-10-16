using System.Threading.Channels;

namespace Prakt3
{
    internal class Program
    {
        delegate void MyDelegate<T>(T value);
        public delegate void MyDelegate1(int[] arr);
        static void Main(string[] args)
        {
            //Anonym
            MyDelegate<int> print = delegate (int value)
            {
                Console.WriteLine(value);
            };
            print(42);

            //Lambda
            Action<int> print2 = x => Console.WriteLine(x);
            print2(42);

            //Lambda 
            MyDelegate1 myDelegate1 = x => Console.WriteLine(x.GetType());
            myDelegate1 += x => { Console.WriteLine(x.Max()); };
            myDelegate1 += x => { Console.WriteLine(x.Min()); };
            myDelegate1(new int[5] { 5, 4, 8, 9, 6 });
        }
    }
}