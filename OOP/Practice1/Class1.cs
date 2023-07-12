using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice1
{
    internal class Class1
    {
        private int numberone = 1;
        private int numbertwo = 2;
        public int getNumberOne()
        {
            return numberone;
        }
        public int getNumberTwo()
        {
            return numbertwo;
        }

        public int setNumberOne(int one)
        {
            return numberone;
        }
        public int setNumberTwo(int two)
        {
            return numbertwo;
        }

        public void Write()
        {
            Console.WriteLine(numberone);
            Console.WriteLine(numbertwo);
        }
        public void Change()
        {
            Console.WriteLine("Измените первое число: ");
            numberone = int.Parse(Console.ReadLine());
            Console.WriteLine("Измените второе число: ");
            numbertwo = int.Parse(Console.ReadLine());
        }

        public int Sum()
        {
            return numberone + numbertwo;
        }

        public int Max()
        {
            int max = numberone;
            if (numbertwo > numberone)
            {
                max = numbertwo;
            }
            return max;
            Console.WriteLine("Максимальное значение: " + max);
        }
    }
}
