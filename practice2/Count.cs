using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace practice2
{
    internal class Count
    {
        private int current;
        private int min;
        private int max;
        public Count(int count, int min, int max)
        {
            if (count < min)
            {
                Console.WriteLine("Текущее значение не должно быть меньше минимального!");
            }
            else if (count > max)
            {
                Console.WriteLine("Текущее значение не должно быть больше максимального!");
            }
            else
            {
            this.current = count;
            this.min = min;
            this.max = max;
            }
        }
        public Count()
        {
            this.current = 1;
            this.min = 0;
            this.max = 10;
        }

        public Count(int min, int max)
        {
            this.min = min;
            this.max = max;
        }
        public int getCurrent()
        {
            return current;
        }

        public void Up()
        {
            if (current < max)
            {
                current++;
            }
        }

        public void Down()
        {
            if (current > min)
            {
                current--;
            }
        }
    }
}
