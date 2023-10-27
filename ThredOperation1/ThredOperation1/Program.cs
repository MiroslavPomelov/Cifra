namespace ThredOperation1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Thread - поток, класс

            //Thread secondaryThread = new Thread(PrintNumbers);

            //secondaryThread.Start();

            ////secondaryThread.Join(); // Ожидает завершения предыдущего метода
            //for (int i = 0; i < 1000; i++)
            //{
            //    Console.SetCursorPosition(30, i);
            //    Console.WriteLine($"Первичный поток: {i}");
            //    Thread.Sleep(250); // Задержка потока на х милисекунд

            //    if (i == 10)
            //    {
            //        secondaryThread.Interrupt(); //Завершение потока
            //    }


            // СВОЙСТВА:

            //Thread secondaryThread = Thread.CurrentThread;

            //secondaryThread.Name = "Главный поток";

            //Thread thirdThread = new Thread(PrintNumbers);
            //thirdThread.Name = "Вторичный";
            //Console.WriteLine($"Работает ли текущий поток: {secondaryThread.IsAlive}");

            // LAMBDA:

            //Thread thread = new Thread(() =>
            //{
            //    Console.WriteLine("asdasda");
            //});
            //thread.Name = "Третий поток";
            //thread.Start();

            //Thread secondaryThread = new Thread(() =>
            //{
            //    Thread.Sleep(1000);
            //});
            //secondaryThread.Start();


            //Console.WriteLine(secondaryThread.IsAlive);
            //Thread.Sleep(12000);
            //Console.WriteLine(secondaryThread.IsAlive);

            // КОПИЯ:

            Thread secondaryThgread = new Thread(PrintNumbers);
            secondaryThgread.Name = "Вторичный поток";
            secondaryThgread.Start();

        }
        //public static void PrintNumbers()
        //{
        //    for (int i = 0; i < 1000; i++)
        //    {
        //        Console.WriteLine($"Вторичный поток: {i}");
        //        Thread.Sleep(300);
        //    }
        //}

        // КОПИЯ:

        public static void PrintNumbers()
        {
            Thread myThread = Thread.CurrentThread;
            Console.WriteLine($" Имя вторичного потока: " + myThread.Name);
            Thread.Sleep(1000);
        }
    }

}





