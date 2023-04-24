using System;
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

            int[] mas = new int[15];
            Random random = new Random();
            for (int i = 0; i < mas.Length; i++)
            {
                mas[i] = random.Next(160, 200);
                Console.Write(mas[i] + " ");
            }
            Console.WriteLine();
            Array.Sort(mas);
            Array.Reverse(mas);
            foreach (int item in mas)
            {
                Console.Write(item + " ");
            }
            Console.WriteLine();
            Console.Write("Введите рост нового ученика: ");
            int n = int.Parse(Console.ReadLine());

            int[] newClass = new int[16];
            Array.Copy(mas, 0, newClass, 0, 15);
            Array.Fill(newClass, n, 15, 1);
            Array.Sort(newClass);
            Array.Reverse(newClass);
            //Array.Resize<int>(ref mas, 16); //Изменяет размер массива на 16 элементов;
            foreach (int item in newClass)
            {
                Console.Write(item + " ");
            }

        }
    }
}