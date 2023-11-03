namespace _03._11._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //int number = 150;
            //Task myTask = Task.Run(() => DoWork(number));

            Random random = new Random();
            Task[] tasks = new Task[5];

            for (int i = 0; i < tasks.Length; i++)
            {
                tasks[i] = Task.Run(() => { DoWork(random.Next(10, 150)); });
            }

            Task.WaitAll(tasks);
        }


        public static void DoWork(int number)
        {
            Console.WriteLine($"Мне передали число, это - {number}");
            Task.Delay(2000).Wait();
            Console.WriteLine("Работа вторич потока завершена");
        }
    }
}