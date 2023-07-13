using HWOOP;
using System.Runtime.CompilerServices;

Time time = new Time();
Console.WriteLine("Введите часы:");
time.setHours(int.Parse(Console.ReadLine()!));
Console.WriteLine("Введите минуты:");
time.setMinutes(int.Parse(Console.ReadLine()!));
Console.WriteLine("Введите секунды:");
time.setSeconds(int.Parse(Console.ReadLine()!));

time.Print();

time.changeTime();
time.Print();