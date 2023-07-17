using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrainProject
{
    internal class Station
    {
        private Train[] trains;

        public Station(int n)
        {
            this.trains = new Train[n];
            for (int i = 0; i < n; i++)
            {
                Console.Write("Введите станцию назначения: ");
                string station = Console.ReadLine()!;
                Console.Write("Введите номер поезда: ");
                int number = int.Parse(Console.ReadLine()!);
                Console.Write("Введите час отправления: ");
                int hour = int.Parse(Console.ReadLine()!);
                Console.Write("Введите минуты отправления: ");
                int minutes = int.Parse(Console.ReadLine()!);
                trains[i] = new Train(station, number, hour, minutes);
            }
        }

        public int CountTrains()
        {
            return trains.Length;
        }

        public Train this[int i]
        {
            get => trains[i]; 
            set => trains[i] = value;
        }
        public void SortByNumber()
        {
            for (int i = 0; i < trains.Length; i++)
            {
                for (int j = i + 1; j < trains.Length; j++)
                {
                    if (trains[i].getNumber() > trains[j].getNumber())
                    {
                        Train temp = trains[i];
                        trains[i] = trains[j];
                        trains[j] = temp;
                    }
                }
            }
        }
        public void PrintByNumber(int n)
        {
            foreach (Train t in trains)
            {
                if (t.getNumber() == n)
                {
                    Console.WriteLine(t.Print());
                }
            }
        }
        public void Print()
        {
            foreach (Train t in trains)
            {
                Console.WriteLine(t.Print());
            }
        }
        ~Station()
        {
            trains = null;
        }
    }
}
