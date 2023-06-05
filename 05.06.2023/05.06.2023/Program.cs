
Console.Write("Введите размер массива: ");
int n = int.Parse(Console.ReadLine());
int[] mas = new int[n];
Random r = new Random();
mas = mas.Select(i => i + r.Next(10, 100)).ToArray();

foreach (int i in mas)
{
    Console.Write(i+" ");
}
Console.WriteLine();
mas = ShakerSort(mas);
foreach (int i in mas)
{
    Console.Write(i + " ");
}
Console.WriteLine();

int[] ShakerSort(int[] mas)
{
    for (int i = 0; i < mas.Length / 2; i++)
    {
        bool swapFlag = false;
        for (int j = i; j < mas.Length - i - 1; j++)
        {
            if (mas[j] > mas[j + 1])
            {
                Swap(ref mas[j], ref mas[j + 1]);
                swapFlag = true;
            }

        }
        for (int j = mas.Length - 2 - i; j > i; j--)
        {
            if (mas[j - 1] > mas[j])
            {
                Swap(ref mas[j - 1], ref mas[j]);
                swapFlag = true;
            }
        }
        if (!swapFlag)
        {
            break;
        }
    }
    return mas;
}

void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}



