namespace _03._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //int number = 150;
            //Task myTask = Task.Run(() => DoWork(number));

            //Random random = new Random();
            //Task[] tasks = new Task[5];

            //for (int i = 0; i < tasks.Length; i++)
            //{
            //    tasks[i] = Task.Run(() => { DoWork(random.Next(10, 150)); });
            //}

            //Task.WaitAll(tasks);




            Task<int[]> task = GetResult();
            task.Wait();

            int[] megaResult = task.Result;

            foreach (int i in megaResult)
            {
                Console.WriteLine(i);
            }

        }


        //public static void DoWork(int number)
        //{
        //    Console.WriteLine($"Мне передали число, это - {number}");
        //    Task.Delay(2000).Wait();
        //    Console.WriteLine("Работа вторич потока завершена");
        //}

        public static Task<int[]> GetResult()
        {
            Task<int[]> task = Task.Run(() => { return GetArray(10); });
            return task;
        }

        public static int[] GetArray(int length)
        {
            Random random = new Random();
            int[] array= new int[length];

            for (int i = 0; i < length; i++)
            {
                array[i] = random.Next(1, 10);
            }
            return array;
        }
    }
}