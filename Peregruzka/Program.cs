using Peregruzka;

Time t1 = new Time(DateTime.Now.Hour, DateTime.Now.Minute);
Console.WriteLine(t1.PrintTime());
Time t2 = new Time(4, 35);
Console.WriteLine(t2.PrintTime());
Time t3 = t1 + t2;
Console.WriteLine(t3.PrintTime());

Time t4 = t1 - t2;
Console.WriteLine(t4.PrintTime());
Console.WriteLine(t1==t2);
Console.WriteLine(t3!=t4);
Time t5 = t1 + 6;
Console.WriteLine(t5.PrintTime());


