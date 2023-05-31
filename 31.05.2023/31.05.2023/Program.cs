//int s = mas.Where((i, s) => i % 2 == 0&&s%2!=0).Sum();

//Linq 
//string? line=Console.ReadLine(); 
//int?  = int.Parse(Console.ReadLine()!); 
//Console.WriteLine(a??0); 
using System.Reflection;

// 11.9

//Console.Write("Введите размер массива:");
//int n = int.Parse(Console.ReadLine()!);
//int[] mas = new int[n];
//Random r = new Random();

//mas = mas.Select(i => r.Next(-10, 11)).ToArray();
//foreach (int item in mas)
//{
//    Console.Write(item + " ");
//}
//Console.WriteLine();
//Console.WriteLine(mas.Where((s, i) => i >= 0 && i <= 10).Average());
//Console.WriteLine(mas.Where((s, i) => i >= 11 && i <= 20).Average());
//Console.WriteLine(mas.Where((s, i) => i >= 21 && i <= 30).Average());
////Console.WriteLine(mas.Sum());
////Console.WriteLine(mas.Aggregate((x, y) => x * y));
////Console.WriteLine(mas.Select(i => i * i).Sum());
////Console.WriteLine(mas.Take(6).Sum());
////int k1 = 2, k2 = 8;
////Console.WriteLine(mas.Where((s,i)=>i>=k1&&i<=k2).Sum());
////Console.WriteLine(mas.Average());
////Console.WriteLine(mas.Where((s, i) => i >= k1 && i <= k2).Average());
////Console.WriteLine();
//////mas = mas.Select(i => i * 2).ToArray();
//////mas = mas.Select(i => i /mas.First()).ToArray();
//foreach (int item in mas)
//{
//    Console.Write(item + " ");
//}
//Console.WriteLine();


// Сортировка массивов

//метод выбора 

//Console.Write("Введите размер массива:");
//int n = int.Parse(Console.ReadLine()!);
//int[] mas = new int[n];
//Random r = new Random();
//mas = mas.Select(i => i + r.Next(-10, 11)).ToArray();
//foreach (int item in mas)
//{
//    Console.Write(item + " ");
//}
//Console.WriteLine();
//for (int i = 0; i < mas.Length - 1; i++)
//{
//    int nMin = i;
//    for (int j = i + 1; j < mas.Length; j++)
//        if (mas[j] < mas[nMin]) nMin = j;
//    if (nMin != i)
//    {
//        int c = mas[i];
//        mas[i] = mas[nMin];
//        mas[nMin] = c;
//    }
//    foreach (int item in mas)
//    {
//        Console.Write(item + " ");
//    }
//    Console.WriteLine();
//}
//foreach (int item in mas)
//{
//    Console.Write(item + " ");
//}
//Console.WriteLine();

//метод простой вставки 

Console.Write("Введите размер массива:");
int n = int.Parse(Console.ReadLine()!);
int[] mas = new int[n];
Random r = new Random();
mas = mas.Select(i => i + r.Next(-10, 11)).ToArray();
foreach (int item in mas)
{
    Console.Write(item + " ");
}
Console.WriteLine();
for (int i = 1; i < mas.Length; i++)
{
    if (mas[i - 1] > mas[i])
    {
        int x = mas[i];
        int j = i - 1;
        while (j >= 0 && mas[j] > x)
        {
            mas[j + 1] = mas[j];
            j--;
        }
        mas[j + 1] = x;
    }
    foreach (int item in mas)
    {
        Console.Write(item + " ");
    }
    Console.WriteLine();
}