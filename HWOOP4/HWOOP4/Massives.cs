using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace HWOOP4
{
    internal class Massives
    {
        private Arrays[] array, arrayresult;

        public Massives(int n)
        {

            this.array = new Arrays[n];
            for (int i = 0; i < n; i++)
            {

                Console.Write($"Введите слова через пробел для {i + 1}го массива: ");
                string elements = Console.ReadLine()!;
                this.array[i] = new Arrays(elements, i);

            }
        }

        public int CountArray()
        {
            return array.Length;
        }

        public Arrays this[int i]
        {
            get => array[i];
            set => array[i] = value;
        }

        public void FindNumber()
        {
            Console.WriteLine("Введите номер массива: ");
            int nm = int.Parse(Console.ReadLine());
            Console.WriteLine("Введите индекс: ");
            int index = int.Parse(Console.ReadLine());
            for (int i = 0; i < 1; i++)
            {
                Console.WriteLine();
                Console.WriteLine("Выбранный массив: ");
                Console.Write(array[nm - 1].Print() + " ");
                Console.Write("Выбранный элемент: ");
                Console.Write(array[nm - 1].IndexPrint(index));
            }
        }

        public void CouplingNewArray(int n)
        {
            Console.WriteLine("Новый массив: ");
            this.arrayresult = new Arrays[n];
            int elementsresult = array.Length;
            for (int i = 0; i < array.Length; i++)
            {
                this.arrayresult[i] = new Arrays(i, elementsresult, n);
                arrayresult[i] = array[i];
            }
            foreach (Arrays arres in this.array)
            {
                Console.WriteLine(arres.PrintNewArray());
            }
        }

        public void MergerNoRepeat()
        {

        }

        public void Print()
        {
            foreach (Arrays arr in array)
            {
                Console.WriteLine(arr.Print());
            }
        }

        static void Union<T>(T[] a, T[] b, ref T[] c)
        {
            Arrays.Resize<T>(ref c, a.Length);
            a.CopyTo(c, 0);
            foreach (T item in b)
            {
                if (!Exist<T>(item, a))
                {
                    Arrays.Resize<T>(ref c, c.Length + 1);
                    c[c.GetUpperBound(0)] = item;
                }
            }
        }
        static bool Exist<T>(T a, T[] b)
        {
            foreach (T item in b)
                if (a.Equals(item)) return true;
            return false;
        }
    }
}
