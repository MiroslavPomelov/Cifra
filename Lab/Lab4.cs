using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab
{
    internal class Lab4
    {
        private string[] mas;
        private int m;

        public Lab4(int n, int m)
        {
            mas = new string[n];
            this.m = m;
            for (int i = 0; i < n; i++)
            {
                char[] elem = new char[m];
                Console.WriteLine("Введите строку: ");
                string temp = Console.ReadLine()!;
                elem = temp.Substring(0, m).ToCharArray();
                mas[i] = new string(elem);
            }
        }
        public string this[int i]
        {
            get { return mas[i]; }
            set
            {
                if (value.Length == m) mas[i] = value;
                else mas[i] = value.Substring(0, m);
            }
        }
        public void Print()
        {
            foreach (string i in mas)
            {
                Console.WriteLine(i);
            }


        }
    }
}
