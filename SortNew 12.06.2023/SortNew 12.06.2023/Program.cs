// Блинная сортировка

using System.Reflection.Metadata.Ecma335;

int[] array = new int[10];
Random Random = new Random();

for (int i = 0; i < array.Length; i++)
{
    array[i] = Random.Next(1, 1001);
}

//array = PancakeSort(array);
array = BogoSort(array);

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


// Проверка упорядоченности

bool IsSorted(int[] mas)
{
    for (int i = 0; i < mas.Length - 1; i++)
    {
        if (mas[i] > mas[i + 1])
        {
            return false;
        }
    }
    return true;
}

// Перемешеване элементов

int[] RandomPermulation(int[] mas)
{
    Random random = new Random();
    int n = mas.Length;
    while (n>1)
    {
        n--;
        int i = random.Next(n+1);
        int temp = mas[i];
        mas[i] = mas[n];
        mas[n] = temp;
    }
    return mas;
}


// Случайная сортировка

int[] BogoSort(int[] mas)
{
    while (!IsSorted(mas))
    {
        mas = RandomPermulation(mas);
    }
    return mas;
}

// Сортировка Шелла

int[] ShellSort(int[] mas)
{
    int d = mas.Length / 2;
    while (d>=1)
    {
        for (int i = d; i < mas.Length; i++)
        {
            int j = i;
            while ((j >= d) && (mas[j - d] > mas[j]))
            {
                Swap(ref mas[j], mas[j - d]);
                j = j - d;
            }
        }
        d = d / 2;
    }
    return mas;
}