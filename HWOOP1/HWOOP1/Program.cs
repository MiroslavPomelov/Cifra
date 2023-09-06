using HWOOP1;

// #1 - Класс время

try
{
    Time time1 = new Time(23,00,43);
    time1.Print();

    time1.changeTime();
    time1.Print();
}
catch (Exception e)
{
    Console.WriteLine($"Ошибка: {e.Message}");
}


Console.WriteLine("-------------------------------------------");

// #2 - Класс Треугольник

Triangle triangle = new Triangle();
Console.Write("Введите первый катет: ");
triangle.setKatet1(double.Parse(Console.ReadLine()!));
Console.Write("Введите второй катет: ");
triangle.setKatet2(double.Parse(Console.ReadLine()!));
Console.Write("Введите гиппотенузу: ");
triangle.setHypotenysa(double.Parse(Console.ReadLine()!));
Console.WriteLine($"Периметр:{triangle.getPerimetr():F2}");
Console.WriteLine($"Первый катет:{triangle.getKatet1()}\nВторой катет:{triangle.getKatet2()}\nГипотенуза: {triangle.getHypotenysa()}\nПлощадь:{triangle.getArea():F2}");
Console.WriteLine($"Точки пересечения мередиан: {triangle.getMeridian()}");
