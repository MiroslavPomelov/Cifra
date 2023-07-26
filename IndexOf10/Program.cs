using IndexOf10;

try
{
    ZelChislo chislo = new ZelChislo();
    Console.Write("Введите число: ");
    chislo.Chislo = int.Parse(Console.ReadLine()!);
    Console.WriteLine(chislo[3]);

    Second second = new Second();
    Console.Write("Введите число: ");
    second.Chislo = int.Parse(Console.ReadLine()!);
    second.SecondChislo = int.Parse(Console.ReadLine()!);
    Console.WriteLine(second[3]);
}
catch (Exception ex)
{

    Console.WriteLine(ex.Message);
}
