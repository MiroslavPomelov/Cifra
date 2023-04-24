using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Intrinsics.Arm;

namespace Teacher1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Сортировка массивов

            //int[] mas = new int[10];
            //Random random = new Random();
            //for (int i = 0; i < mas.Length; i++)
            //{
            //    mas[i] = random.Next(10, 100);
            //    Console.Write(mas[i] + " ");
            //}

            //Console.WriteLine();

            //for (int i = 0; i < mas.Length - 1; i++)
            //{
            //    for (int j = i + 1; j < mas.Length; j++)
            //    {
            //        if (mas[i] > mas[j])  //if (mas[i] > mas[j]) - По убыванию
            //        {
            //            int temp = mas[i];
            //            mas[i] = mas[j];
            //            mas[j] = temp;
            //        }
            //    }
            //}
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();

            //Array.Clear(mas, 0, mas.Length); //Обнуление всего массива
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Reverse(mas); //Наоборот массив
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Sort(mas); //Сортировка массива по возрастанию
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Fill(mas, 5); //Заполнение массива //Array.Fill(mas, 5,0,5) - заполнение с первого до 4 элемента
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Sort(mas);
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();
            //Console.WriteLine(Array.BinarySearch(mas, 56)); //Производится только в отсортированном массиве);

            //int[] mas2 = new int[10];
            //Array.ConstrainedCopy(mas, 3, mas2, 3, 4); //Копирую с первого массива с 3 элемента вставляю во второй массив с 3 го элемента 4 элемента
            //foreach (int item in mas2)
            //{
            //    Console.Write(item + " ");
            //}
            //Array.Copy(mas, mas2, 6); //Копировать с массива 1 в массив 2 - 6 элементов

            //Console.WriteLine(Array.IndexOf(mas, 45)); //Первое вхождение 45 в массив, если нет возвращает -1
            //Console.WriteLine(Array.LastIndexOf(mas, 45)); //Ищет с конца

            //11.162

            //int[] mas = new int[15];
            //Random random = new Random();
            //for (int i = 0; i < mas.Length; i++)
            //{
            //    mas[i] = random.Next(160, 200);
            //    Console.Write(mas[i] + " ");
            //}
            //Console.WriteLine();
            //Array.Sort(mas);
            //Array.Reverse(mas);
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();
            //Console.Write("Введите рост нового ученика: ");
            //int n = int.Parse(Console.ReadLine());

            //int[] newClass = new int[16];
            //Array.Copy(mas, 0, newClass, 0, 15);
            //Array.Fill(newClass, n, 15, 1);
            //Array.Sort(newClass);
            //Array.Reverse(newClass);
            ////Array.Resize<int>(ref mas, 16); //Изменяет размер массива на 16 элементов;
            //foreach (int item in newClass)
            //{
            //    Console.Write(item + " ");
            //}

            //12.99

            //int[,] mas = new int[25, 36];
            //int[] newMas = new int[25];
            //int max = int.MinValue;
            //int index = -1;
            //int min = int.MaxValue;

            //Random rand = new Random();

            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    int sum = 0;
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(2);
            //        Console.Write(mas[i, j] + " ");
            //        sum+=mas[i, j];
            //    }
            //    if (sum > max)
            //    {
            //        max = sum;
            //        index = i;
            //    }
            //}

            //Console.WriteLine();
            //Console.WriteLine("max = " + index);

            // Найти наибольшйи элемент массива в каждой строке и заполнить его в новом массиве из макс значений

            //int[,] mas = new int[10, 10];
            //Random rand = new Random();
            //int[] newMas = new int[10];
            //int[] res = new int[10];
            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(10, 100);
            //        Console.Write(mas[i, j] + " ");
            //        newMas[j] = mas[i, j];
            //    }
            //    res[i] = newMas.Max();
            //    Console.WriteLine();
            //}
            //Console.WriteLine();

            //foreach (int item in res)
            //{
            //    Console.Write(item + " ");
            //}

            //Console.WriteLine();
            //Console.WriteLine();
            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    int maximum = int.MinValue;
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(10, 100);
            //        Console.Write(mas[i, j] + " ");
            //        if (mas[i, j] > maximum) maximum = mas[i, j];
            //    }
            //    res[i] = maximum;
            //    Console.WriteLine();
            //}
            //Console.WriteLine();
            //foreach (int item in res)
            //{
            //    Console.Write(item + " ");
            //}

            Console.WriteLine(Factorial(5)); // - факториал из 5
            Console.WriteLine(RecFact(5));

            long Factorial(int n)
            {
                long F = 1;
                for (int i = 1; i <= n; i++)
                {
                    F *= i;
                }
                return F;
            }

            long RecFact(int n)
            {
                if (n==0 || n==1)
                {
                    return 1;
                }
                return n * RecFact(n - 1);
            }
        }
    }
}