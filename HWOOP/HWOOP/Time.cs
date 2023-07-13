using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace HWOOP
{
    internal class Time
    {
        private int hours;
        private int minutes;
        private int seconds;

        public Time(int hours, int minutes, int seconds)
        {
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
        }

        public Time()
        {
        }

        public void setHours(int h)
        {
            if (h < 0 || h >= 24)
            {
                throw new Exception("Неправильный формат времени!");
            }
            //else if (h == null)
            //{
            //    h = hours;
            //}
            else
            {
                this.hours = (int)h;
            }
        }
        public void setMinutes(int m)
        {
            if (m < 0 || m >= 60)
            {
                throw new Exception("Неправильный формат времени!");
            }
            //else if (m == null)
            //{
            //    m = minutes;
            //}
            else
            {
                minutes = m;
            }
        }
        public void setSeconds(int s)
        {
            if (s < 0 || s >= 60)
            {
                throw new Exception("Неправильный формат времени!");
            }
            //else if (s == null)
            //{
            //    s = seconds;
            //}
            else
            {
                seconds = s;
            }
        }

        public void changeTime()
        {
            Console.WriteLine("Вы хотите изменить время?\n 1- да, 2 - нет");
            int choice = int.Parse(Console.ReadLine());
            if (choice == 1)
            {
                Console.WriteLine("Введите часы:");
                setHours(int.Parse(Console.ReadLine()));
                Console.WriteLine("Введите минуты:");
                setMinutes(int.Parse(Console.ReadLine()));
                Console.WriteLine("Введите секунды:");
                setSeconds(int.Parse(Console.ReadLine()));
            }
        }
        public void Print()
        {
            Console.WriteLine($"\n{hours}:{minutes}:{seconds}");
        }
    }
}
