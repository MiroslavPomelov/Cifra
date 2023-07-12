using OOP;

Rectangle rect = new Rectangle();
Console.Write("Введите ширину: ");
rect.setWidth(double.Parse(Console.ReadLine()!));
Console.Write("Введите высоту: ");
rect.setHeight(double.Parse(Console.ReadLine()!));
Console.WriteLine($"Ширина: {rect.getWidth()} Высота: {rect.getHeight()} \nПлощадь: {rect.getArea():F2}");
Console.WriteLine($"Периметр: {rect.getPerimetr():F2}");