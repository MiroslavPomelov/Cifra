using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HWOOP4
{
    internal class Array
    {
        private string[] array, arrayresult;

        public Array(string elements, int j)
        {
            this.array = elements.Split(' ');
        }

        public Array(int i, int elementsresult, int n)
        {
            int e = elementsresult * n;
            this.arrayresult = new string[e];
        }

        public string Print()
        {
            for (int i = 0; i < array.Length; i++)
            {
                Console.Write(array[i]);
                Console.WriteLine(" ");
            }
            return $" ";
        }

        public string PrintNewArray()
        {
            for (int i = 0; i < array.Length; i++)
            {
                Console.Write(array[i]);
                Console.WriteLine(" ");
            }
            return $" ";
        }

        public string IndexPrint(int index)
        {
            Console.Write(array[index - 1]);
            Console.WriteLine(" ");
            return $" ";
        }
        public string Index(int index)
        {
            return $"{array[index]}";
        }
    }
}
