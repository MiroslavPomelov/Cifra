using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _07._04._2023
{
    public class Number
    {
        public int Value = 1;
        public string Text = "None";

        public void ReadValue()
        {
            Console.WriteLine("Введите число: ");
            Value = int.Parse(Console.ReadLine());
        }

        public void ReadText()
        {
            Console.WriteLine("Введите тест: ");
            Text = Console.ReadLine();
        }
    }
}
