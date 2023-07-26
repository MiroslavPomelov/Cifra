using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Peregruzka
{
    internal class Time
    {
        private int hour;
        public int Hour
        {
            get { return hour; }
            set
            {
                if (value >= 0 && value < 24)
                {
                    hour = value;
                }
            }
        }
        private int minute;
        public int Minute
        {
            get { return minute; }
            set
            {
                if (value >= 0 && value < 60)
                {
                    minute = value;
                }
            }
        }

        public Time(int hour, int minute)
        {
            Hour = hour;
            Minute = minute;
        }

        public string PrintTime()
        {
            string h = "", m = "";
            if (hour < 10)
            {
                h = "0" + hour;
            }
            else
            {
                h = hour.ToString();
            }
            if (minute < 10)
            {
                m = "0" + minute;
            }
            else
            {
                m = minute.ToString();
            }
            return $"{h}:{m}";
        }
        public static Time operator +(Time a, Time b)
        {
            int h = a.hour + b.hour;
            int m = a.minute + b.minute;
            if (m >= 60)
            {
                h++;
                m = m - 60;
            }
            return new Time(h, m);
        }

        public static Time operator +(Time a, int hours)
        {
            int h = a.hour + hours%24;
            if (h >= 24)
            {
                h -= 24;
            }
            return new Time(h, a.minute);
        }

        public static Time operator -(Time a, Time b)
        {
            int h = a.hour - b.hour;
            int m = a.minute - b.minute;
            if (m < 0)
            {
                h--;
                m = m + 60;
            }
            return new Time(h, m);
        }

        public static bool operator ==(Time a, Time b)
        {
            return a.hour == b.hour || a.minute == b.minute;
        }
        public static bool operator !=(Time a, Time b)
        {
            return a.hour != b.hour || a.minute != b.minute;
        }
        public static bool operator >(Time a, Time b)
        {
            //return (a.hour > b.hour || a.minute > b.minute);
            if (a.hour > b.hour)
            {
                return true;
            }
            else if (a.hour == b.hour && a.minute > b.minute)
            {
                return true;
            }
            return false;
        }
        public static bool operator <(Time a, Time b)
        {
            if (a.hour < b.hour)
            {
                return true;
            }
            else if (a.hour == b.hour && a.minute < b.minute)
            {
                return true;
            }
            return false;
        }
    }
}

