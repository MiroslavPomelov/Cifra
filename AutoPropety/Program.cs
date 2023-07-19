using AutoPropety;

AutoMobile auto = new AutoMobile("Mercedes", 50, 12);
Console.WriteLine($"Автомобиль: {auto.Name} поехал");
//Console.Write("Введите сколько км проехал автомобиль: ");
//auto.Go(double.Parse(Console.ReadLine()!));
//Console.WriteLine($"Осталось топилва: {auto.Fuel}");
//Console.WriteLine($"Запас топлива на {auto.Total():F2}км.");
int km = 0;
while (auto.Fuel > 0)
{
    auto.Go(km);
    if (auto.Fuel <= 0)
    {
        break;
    }
    Console.WriteLine($"Осталось топилва: {auto.Fuel:F1} литров");
    Console.WriteLine($"Запас топлива на {auto.Total():F2}км.");
    km += 10;
}