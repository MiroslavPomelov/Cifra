using HWOOP2;

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

