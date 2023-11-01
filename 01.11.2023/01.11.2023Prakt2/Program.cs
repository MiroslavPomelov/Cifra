namespace _01._11._2023Prakt2
{
    internal class Program
    {
        //public static object queue = new object();

        //public static Mutex mutex = new Mutex(); // По сути тот же монитор

        public static Semaphore semaphore = new Semaphore(1, 2); //(количесвто потоков сейчас, всего потоков очередь). Лучше всего, более гибкий
        public static int data = 0;

        static void Main(string[] args)
        {
            Thread one = new Thread(Dataencreaser);
            Thread two = new Thread(Dataencreaser);

            one.Start();
            two.Start();

            one.Join();
            two.Join();

            Console.WriteLine(data);
        }
        public static void Dataencreaser()
        {

            //for (int i = 0; i < 100000; i++)
            //{
            //lock(queue)
            //  {
            //      data++;
            //  }

            //Monitor.Enter(queue); // Аналог - lock

            //try
            //{
            //    data++;
            //}
            //finally
            //{
            //    Monitor.Exit(queue);
            //}

            //mutex.WaitOne();
            //data++;
            //mutex.ReleaseMutex();

            //}

            semaphore.WaitOne();

            try
            {
                for (int i = 0; i < 10000; i++)
                {
                    data++;
                }
            }
            finally
            {

                semaphore.Release();
            }
        }
    }
}

