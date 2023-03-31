using System.Data;

namespace sharp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int _seconds = 0;

            while (true)
            {
                Console.Clear();
                _seconds = AddSeconds(_seconds);
                Console.WriteLine($"Время: {GetHours()}:{GetMinute()}:{GetSeconds()}");
                Console.WriteLine($"Секунды: {_seconds}");
                Thread.Sleep(1000);
            }

            Console.ReadLine();

            //END PRPGRAMM

            int AddSeconds(int seconds)
            {
                return seconds + GetSeconds();
            }

            int GetSeconds()
            {
                return DateTime.Now.Second;
            }

            int GetMinute()
            {
                return DateTime.Now.Minute;
            }

            int GetHours()
            {
                return DateTime.Now.Hour;
            }
        }
    }
}