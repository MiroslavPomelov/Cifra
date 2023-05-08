using System.Buffers;
using System.Data;
using System.Globalization;

namespace Time
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //d - день месяца 1 до 31
            //dd - день месяца 1 до 31. К одноразрядным добавляется 0
            //ddd - сокращенное название дня недели
            //dddd - полное название дня недели

            //f/ffffffff - представляет собой милисекунды. Количество f - указывает на число разрядов в милисекундах

            //g - период или эра

            //h - часы в виде от 1 до 12
            //hh - часы от 1 до 12. Часы с одной цифрой дополняются 0
            //H - часы в виде от 0 до 23
            //H -  часы от 0 до 23. Часы с одной цифрой дополняются 0

            //K - часовой пояс

            //m - минуты от 0 до 59
            //mm - минуты от 0 до 59. Минуты с одной цифрой дополняются 0
            //M - месяц от 1 до 12.
            //MM - месяц от 1 до 12. Месяц с одной цифрой дополняются 0
            //MMM - сокращенное название месяца
            //MMMM - полное название месяца

            //s - секунды от 0 до 59
            //ss - секунды от 0 до 59.  Секунды с одной цифрой дополняются 0

            //t - первые символы в обозначениях АМ и PM

            //y - год с одной или двух цифр.
            //yy - год с одной или двух цифр. Года с одной цифрой дополняются 0
            //yyy - год из 3х цифр.
            //yyyy - год из 4х цифр

            //z - смещение в часах относительно времени UTC
            //zz - смещение в часах относительно времени UTC. Смещение с одной цифрой дополняются 0


            //DateTime now = DateTime.Now;
            //Console.WriteLine(now.ToString("hh:mm:ss"));
            //Console.WriteLine(now.ToString("dd.MM.yyyy"));
            //Console.WriteLine(now.ToString("dd.MM.yyyy HH:mm:ss"));


            // 1 prost

            //Console.Write("Введите год, месяц, день первой даты: ");
            //int y1 = int.Parse(Console.ReadLine());
            //int m1 = int.Parse(Console.ReadLine());
            //int d1 = int.Parse(Console.ReadLine());
            //DateTime dt1 = new(y1, m1, d1);

            //Console.Write("Введите год, месяц, день первой даты: ");
            //int y2 = int.Parse(Console.ReadLine());
            //int m2 = int.Parse(Console.ReadLine());
            //int d2 = int.Parse(Console.ReadLine());
            //DateTime dt2 = new(y2, m2, d2);

            //if (dt1 > dt2)
            //{
            //    Console.WriteLine($"Дата {dt1.ToString("dd.MM.yyyy")} больше чем дата {dt2.ToString("dd.MM.yyyy")}");
            //}
            //else if (dt1 < dt2)
            //{
            //    Console.WriteLine($"Дата {dt1.ToString("dd.MM.yyyy")} больше чем дата {dt2.ToString("dd.MM.yyyy")}");
            //}
            //else
            //{
            //    Console.WriteLine("Равны");
            //}


            // 2

            //Console.Write("Введите время запуска батареи: ");
            //int year = int.Parse(Console.ReadLine());
            //int month = int.Parse(Console.ReadLine());
            //int day = int.Parse(Console.ReadLine());
            //int hour = int.Parse(Console.ReadLine());
            //int minutes = int.Parse(Console.ReadLine());
            //int seconds = int.Parse(Console.ReadLine());
            //DateTime d = new(year, month, day, hour, minutes, seconds);

            //Console.Write("Введите задекларированное время работы: ");
            //int h = int.Parse(Console.ReadLine());

            //if (DateTime.Now.Subtract(d).Hours < h)
            //{
            //    //Console.WriteLine($"Количество часов работы: {DateTime.Now.Subtract(d).Hours}, до полного разряда {60 * h - (DateTime.Now.Subtract(d).Minutes + DateTime.Now.Subtract(d).Hours * 60)} минут");
            //}


            ////DateOnly

            //DateOnly d1 = new DateOnly();
            //Console.WriteLine(d1);
            //DateOnly d2 = new DateOnly(2023, 5, 8);
            //Console.WriteLine(d2);
            //DateOnly d3 = new DateOnly(2023, 5, 8, new JulianCalendar());
            //DateOnly now = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            //Console.WriteLine(d3);
            //Console.WriteLine(now);

            //// Свойства 

            //Console.WriteLine(now.Day);
            //Console.WriteLine(now.DayNumber); // Количество дней с начала нашей эры
            //Console.WriteLine(now.DayOfWeek);
            //Console.WriteLine(now.DayOfYear);
            //Console.WriteLine(DateOnly.MaxValue);
            //Console.WriteLine(DateOnly.MinValue);
            //Console.WriteLine(now.Month);
            //Console.WriteLine(now.Year);

            //// Методы

            //Console.WriteLine(now.AddDays(20));
            //Console.WriteLine(now.AddMonths(5));
            //Console.WriteLine(now.AddYears(2));
            //Console.WriteLine(now.ToLongDateString());
            //Console.WriteLine(now.ToShortDateString());

            //// Статические методы

            //DateOnly d4 = DateOnly.FromDateTime(DateTime.Now);
            //Console.WriteLine(d4);
            //DateOnly d5 = DateOnly.FromDayNumber(300); // с текущей даты +300 дней
            //Console.WriteLine(d5);
            //DateOnly d6 = DateOnly.Parse("8.05.2023");
            //Console.WriteLine(d6);
            ////DateOnly d7 = DateOnly.ParseExact(,"dd.MM.yy");
            //DateOnly d8 = new DateOnly();
            //DateOnly.TryParse("8.05.2023", out d8);
            //Console.WriteLine(d8);
            ////DateOnly d9 = new DateOnly();
            ////DateOnly.TryParseExact("8.05.2023", String.Format("dd.MM.yy"));


            //// TimeOnly
            ////Время в диапазоне от 00:00:00 до 23:59:59.99999999

            //TimeOnly t1 = new TimeOnly();
            //Console.WriteLine(t1);
            //TimeOnly t2 = new TimeOnly(4, 30);
            //Console.WriteLine(t2);
            //TimeOnly t3 = new TimeOnly(4,30,50);
            //Console.WriteLine(t3);

            //// Свойства

            //TimeOnly nowTime = new TimeOnly(DateTime.Now.Hour, DateTime.Now.Minute,DateTime.Now.Second, DateTime.Now.Millisecond);
            //Console.WriteLine(nowTime.Hour);
            //Console.WriteLine(nowTime.Minute);
            //Console.WriteLine(nowTime.Second);
            //Console.WriteLine(nowTime.Millisecond);
            //Console.WriteLine(TimeOnly.MaxValue);
            //Console.WriteLine(TimeOnly.MinValue);

            //// Методы

            //Console.WriteLine(nowTime.AddHours(5)); // Добавить часы
            //Console.WriteLine(nowTime.AddMinutes(238));
            //Console.WriteLine(nowTime.Add(new TimeSpan(4,4,34,23,24)));
            //Console.WriteLine(nowTime.ToLongTimeString()); // Длинный фомат времени
            //Console.WriteLine(nowTime.ToShortTimeString());

            //// Cтатические методы

            //TimeOnly t4 = TimeOnly.FromDateTime(DateTime.Now);
            //Console.WriteLine(t4);
            //TimeOnly t5 = TimeOnly.FromTimeSpan(new TimeSpan(5,6,23)); // интервал с каого то времени
            //Console.WriteLine(t5);
            //Console.WriteLine(TimeOnly.Parse("12:12:45"));


            // 4.2

            Console.Write("Введите год правонарушения: ");
            int year = int.Parse(Console.ReadLine());
            Console.Write("Введите месяц правонарушения: ");
            int month = int.Parse(Console.ReadLine());
            Console.Write("Введите день правонарушения: ");
            int day = int.Parse(Console.ReadLine());
            DateOnly dayLow = new DateOnly(year, month, day);

            DateOnly now = DateOnly.FromDateTime(DateTime.Now);
            DateTime d1 = dayLow.ToDateTime(TimeOnly.MinValue);
            DateTime d2 = now.ToDateTime(TimeOnly.MinValue);
            TimeSpan ts = d2.Subtract(d1);
            //Console.WriteLine($"Прошло:{now.Year - dayLow.Year} лет, {Math.Abs(now.Month - dayLow.Month)} месяцев, {Math.Abs(now.Day - dayLow.Day)} дней");
            Console.WriteLine($"Прошло:{ts.Days/365} лет, {ts.Days/30} месяцев, {ts.Days%30} дней");

        }
    }
}