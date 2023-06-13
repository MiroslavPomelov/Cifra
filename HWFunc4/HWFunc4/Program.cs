int[,] _arr1 = new int[4, 4];
int[,] _arr2 = new int[4, 4];
int[,] _arrResult = new int[4, 4];
Random random = new Random();

Console.WriteLine("Первый массив: ");
for (int i = 0; i < 4; i++)
{
    for (int j = 0; j < 4; j++)
    {
        _arr1[i, j] = random.Next(-50, 50);
        Console.Write(_arr1[i, j] + " ");
    }
    Console.WriteLine();
}

Console.WriteLine();

Console.WriteLine("Второй массив: ");
for (int i = 0; i < 4; i++)
{
    for (int j = 0; j < 4; j++)
    {
        _arr2[i, j] = random.Next(-50, 50);
        Console.Write(_arr2[i, j] + " ");
    }
    Console.WriteLine();
}
int[,] SumArr(int[,] arr1, int[,] arr2)
{
    int[,] arr = new int[4, 4];
    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            arr[i, j] = arr1[i, j] + arr2[i, j];
        }
    }
    return arr;
}
Console.WriteLine();

int MaxValue(int[,] arr)
{
    int max = arr[0, 0];
    for (int i = 0; i < 4; i++)
    {
        for (int j = 0; j < 4; j++)
        {
            if (max < arr[i, j])
            {
                max = arr[i, j];
            }
        }
    }
    return max;
}

_arrResult = SumArr(_arr1, _arr2);

Console.WriteLine("Массив суммы двух предыдущих: ");
for (int i = 0; i < 4; i++)
{
    for (int j = 0; j < 4; j++)
    {
        Console.Write(_arrResult[i, j] + " ");
    }
    Console.WriteLine();
}

int max = MaxValue(_arrResult);

Console.WriteLine();
Console.WriteLine("Максимальное значение массива: " + max);

