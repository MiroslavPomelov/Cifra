using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP6
{
    internal class Replace
    {
        public static void Repl(char[] arr)
        {
            char temp = ' ';
            for (int i = 0; i < arr.Length; i++)
            {
                temp = arr[i];
                arr[i] = arr[arr.Length - 1];
                arr[arr.Length - 1] = temp;
            }
        }

        public static void Print2(char[] arr)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                Console.Write($"{arr[i]}");
                Console.WriteLine(" ");
            }
        }
    }
}
