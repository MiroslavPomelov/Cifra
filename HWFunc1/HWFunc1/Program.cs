int Sum(int x, int y)
{
    int result = x + y;
    return result;
}

Console.WriteLine("Введите первое число: ");
int _num1 = int.Parse(Console.ReadLine());
Console.WriteLine("Введите первое число: ");
int _num2 = int.Parse(Console.ReadLine());

Console.WriteLine($"Сумма: {Sum(_num1, _num2)}");