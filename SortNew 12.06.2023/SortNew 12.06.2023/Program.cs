// Блинная сортировка

int[] array = new int[1000];
Random Random = new Random();

for (int i = 0; i < array.Length; i++)
{
    array[i] = Random.Next(1, 1001);
}

array = PancakeSort(array);

foreach (var item in array)
{
    Console.Write(item + " ");
}

int IndexOfMax(int[] mas, int n)
{
    int result = 0;
    for (int i = 1; i <= n; i++)
    {
        if (mas[i] > mas[result])
        {
            result = i;
        }
    }
    return result;
}

void Flip(int[] mas, int end)
{
    for (var start = 0; start < end; start++, end--)
    {
        int temp = mas[start];
        mas[start] = mas[end];
        mas[end] = temp;
    }
}

int[] PancakeSort(int[] mas)
{
    for (int i = mas.Length - 1; i >= 0; i--)
    {
        int maxIndex = IndexOfMax(mas, i);
        if (maxIndex != i)
        {
            Flip(mas, maxIndex);
            Flip(mas, i);
        }
    }
    return mas;
}