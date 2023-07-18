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
        private Array[] array, arrayresult;

        public Massives(int n)
        {

            this.array = new Array[n];
            for (int i = 0; i < n; i++)
            {

                Console.Write($"Введите слова через пробел для {i + 1}го массива: ");
                string elements = Console.ReadLine()!;
                this.array[i] = new Array(elements, i);

            }
        }

        public int CountArray()
        {
            return array.Length;
        }

        public Array this[int i]
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
            this.arrayresult = new Array[n];
            int elementsresult = array.Length;
            for (int i = 0; i < array.Length; i++)
            {
                this.arrayresult[i] = new Array(i, elementsresult, n);
                arrayresult[i] = array[i];
            }
            foreach (Array arres in this.array)
            {
                Console.WriteLine(arres.PrintNewArray());
            }
        }

        public void MergerNoRepeat()
        {

        }

        public void Print()
        {
            foreach (Array arr in array)
            {
                Console.WriteLine(arr.Print());
            }
        }
    }
}
