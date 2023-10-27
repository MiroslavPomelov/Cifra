using System.Diagnostics.Metrics;

namespace ThreadDost
{
    internal class Program
    {
        private static readonly object _lockObject = new object();
        private static int _counter = 0;
        static void Main(string[] args)
        {
            Thread firstThread = new Thread(IncrementCounter);
            Thread secondThread = new Thread(IncrementCounter);

            firstThread.Start();
            secondThread.Start();

            firstThread.Join();
            secondThread.Join();

            Console.WriteLine("Оба потока завершили работу. \nКонечное состояние счетчика: " + _counter);
        }

        public static void IncrementCounter()
        {
            for (int i = 0; i < 100000; i++)
            {
                lock(_lockObject) // Обработка конфилктов нескольких потоков доступа к объекту
                {
                    _counter++;
                }
            }
        }
    }
}