using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP1
{
    internal class Time
    {
        private int _hours;
        private int _minutes;
        private int _seconds;

        public Time(int hours, int minutes, int seconds)
        {
            //if (hours > 0 && hours <= 24)
            //{
            //    _hours = hours;
            //}
            //else
            //{
            //    throw new Exception("Неправильный формат часов!");
            //}

            //if (minutes > 0 && minutes <= 60)
            //{
            //    _minutes = minutes;
            //}
            //else
            //{
            //    throw new Exception("Неправильный формат минут!");
            //}

            //if (seconds > 0 && seconds <= 60)
            //{
            //    _seconds = seconds;
            //}
            //else
            //{
            //    throw new Exception("Неправильный формат секунд!");
            //}

            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }

        public Time()
        {

        }

        public void setHours(int h)
        {
            if (h < 0 || h >= 24)
            {
                throw new Exception("Неправильный формат часов!");
            }
            else
            {
                _hours = h;
            }
        }
        public void setMinutes(int m)
        {
            if (m < 0 || m >= 60)
            {
                throw new Exception("Неправильный формат минут!");
            }
            else
            {
                _minutes = m;
            }
        }
        public void setSeconds(int s)
        {
            if (s < 0 || s >= 60)
            {
                throw new Exception("Неправильный формат секунд!");
            }
            else
            {
                _seconds = s;
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
                Console.WriteLine();
            }
        }
        public void Print()
        {
            Console.WriteLine($"Время: {_hours}:{_minutes}:{_seconds}\n");
        }
    }
}

