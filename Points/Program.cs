using Points;

Console.Write("Введите количество точек: ");
int n = int.Parse(Console.ReadLine()!);
int i = 1;

while (i <= n)
{
    Console.Write("Введите координату x: ");
    double x = double.Parse(Console.ReadLine()!);
    Console.Write("Введите координату y: ");
    double y = double.Parse(Console.ReadLine()!);
    Point point = new Point { X = x, Y = y };
    Point.OurPoints.Add(point);
    Point.Count++;
    Console.WriteLine(Point.LengthPoints());
    i++;
}
Console.WriteLine(Point.Count);