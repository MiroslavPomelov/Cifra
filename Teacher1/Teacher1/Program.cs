using System;

namespace Teacher1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] mas = new int[12];
            Random r = new Random();
            double s = 0;

            for (int i = 0; i < mas.Length; i++)
            {
                mas[i] = r.Next(10, 100);
                Console.Write(mas[i] + " ");
            }
            Console.WriteLine();
            int temp = mas[2];
            mas[2] = mas[5];
            mas[5] = temp;
            foreach (int i in mas)
            {
                Console.Write(i + " ");
            }

            //1.31

            //int[] mas = new int[35];
            //Random r = new Random();
            //int sum = 0;

            //for (int i = 0; i < mas.Length; i++)
            //{
            //    mas[i] = r.Next(10, 1000);
            //    Console.Write(mas[i] + " ");
            //    sum += mas[i];
            //}

            //Console.WriteLine("\nСумма книг: " + sum);

            //if (sum >= 100000 && sum < 1000000)
            //{
            //    Console.WriteLine("Верно");
            //}
            //else
            //{
            //    Console.WriteLine("Неверно");
            //}
        }
    }
}