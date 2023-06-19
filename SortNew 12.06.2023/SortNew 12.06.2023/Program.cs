// Блинная сортировка

using System.Reflection.Metadata.Ecma335;

int[] array = new int[1000];
Random Random = new Random();

for (int i = 0; i < array.Length; i++)
{
    array[i] = Random.Next(1, 1001);
}

//array = PancakeSort(array);
array = MergeSortMas(array);

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
    while (n > 1)
    {
        n--;
        int i = random.Next(n + 1);
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
    while (d >= 1)
    {
        for (int i = d; i < mas.Length; i++)
        {
            int j = i;
            while ((j >= d) && (mas[j - d] > mas[j]))
            {
                //Swap(ref mas[j], mas[j - d]);
                //j = j - d;
            }
        }
        d = d / 2;
    }
    return mas;
}

// Сортировка Слиянием

int[] MergeSort(int[] mas, int lowIndex, /*int middleIndex,*/ int highIndex)
{
    if (lowIndex < highIndex)
    {
        int middleIndex = (lowIndex + highIndex) / 2;
        MergeSort(mas, lowIndex, middleIndex);
        MergeSort(mas, middleIndex + 1, highIndex);
        Merge(mas, lowIndex, middleIndex, highIndex);
    }
    return mas;
}

int[] MergeSortMas(int[] mas)
{
    return MergeSort(mas, 0, mas.Length - 1);
}

void Merge(int[] mas, int lowIndex, int middleIndex, int highIndex)
{
    int left = lowIndex;
    int right = middleIndex + 1;
    int[] tempMas = new int[highIndex - lowIndex + 1];
    int index = 0;
    while ((left <= middleIndex) && (right<=highIndex))
    {
        if (mas[left] <= mas[right])
        {
            tempMas[index] = mas[left];
            left++;
        }
        else
        {
            tempMas[index] = mas[right];
            right++;
        }
        index++;
    }
    for (int i = left; i <= middleIndex; i++)
    {
        tempMas[index] = mas[i];
        index++;
    }
    for (int i = right; i <= highIndex; i++)
    {
        tempMas[index] = mas[i];
        index++;
    }
    for (int i = 0; i < tempMas.Length; i++)
    {
        mas[lowIndex + i] = tempMas[i];
    }
}