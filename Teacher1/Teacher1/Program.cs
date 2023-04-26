using System;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.Intrinsics.Arm;

namespace Teacher1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Сортировка массивов

            //int[] mas = new int[10];
            //Random random = new Random();
            //for (int i = 0; i < mas.Length; i++)
            //{
            //    mas[i] = random.Next(10, 100);
            //    Console.Write(mas[i] + " ");
            //}

            //Console.WriteLine();

            //for (int i = 0; i < mas.Length - 1; i++)
            //{
            //    for (int j = i + 1; j < mas.Length; j++)
            //    {
            //        if (mas[i] > mas[j])  //if (mas[i] > mas[j]) - По убыванию
            //        {
            //            int temp = mas[i];
            //            mas[i] = mas[j];
            //            mas[j] = temp;
            //        }
            //    }
            //}
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();

            //Array.Clear(mas, 0, mas.Length); //Обнуление всего массива
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Reverse(mas); //Наоборот массив
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Sort(mas); //Сортировка массива по возрастанию
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Fill(mas, 5); //Заполнение массива //Array.Fill(mas, 5,0,5) - заполнение с первого до 4 элемента
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}

            //Array.Sort(mas);
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();
            //Console.WriteLine(Array.BinarySearch(mas, 56)); //Производится только в отсортированном массиве);

            //int[] mas2 = new int[10];
            //Array.ConstrainedCopy(mas, 3, mas2, 3, 4); //Копирую с первого массива с 3 элемента вставляю во второй массив с 3 го элемента 4 элемента
            //foreach (int item in mas2)
            //{
            //    Console.Write(item + " ");
            //}
            //Array.Copy(mas, mas2, 6); //Копировать с массива 1 в массив 2 - 6 элементов

            //Console.WriteLine(Array.IndexOf(mas, 45)); //Первое вхождение 45 в массив, если нет возвращает -1
            //Console.WriteLine(Array.LastIndexOf(mas, 45)); //Ищет с конца

            //11.162

            //int[] mas = new int[15];
            //Random random = new Random();
            //for (int i = 0; i < mas.Length; i++)
            //{
            //    mas[i] = random.Next(160, 200);
            //    Console.Write(mas[i] + " ");
            //}
            //Console.WriteLine();
            //Array.Sort(mas);
            //Array.Reverse(mas);
            //foreach (int item in mas)
            //{
            //    Console.Write(item + " ");
            //}
            //Console.WriteLine();
            //Console.Write("Введите рост нового ученика: ");
            //int n = int.Parse(Console.ReadLine());

            //int[] newClass = new int[16];
            //Array.Copy(mas, 0, newClass, 0, 15);
            //Array.Fill(newClass, n, 15, 1);
            //Array.Sort(newClass);
            //Array.Reverse(newClass);
            ////Array.Resize<int>(ref mas, 16); //Изменяет размер массива на 16 элементов;
            //foreach (int item in newClass)
            //{
            //    Console.Write(item + " ");
            //}

            //12.99

            //int[,] mas = new int[25, 36];
            //int[] newMas = new int[25];
            //int max = int.MinValue;
            //int index = -1;
            //int min = int.MaxValue;

            //Random rand = new Random();

            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    int sum = 0;
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(2);
            //        Console.Write(mas[i, j] + " ");
            //        sum+=mas[i, j];
            //    }
            //    if (sum > max)
            //    {
            //        max = sum;
            //        index = i;
            //    }
            //}

            //Console.WriteLine();
            //Console.WriteLine("max = " + index);

            // Найти наибольшйи элемент массива в каждой строке и заполнить его в новом массиве из макс значений

            //int[,] mas = new int[10, 10];
            //Random rand = new Random();
            //int[] newMas = new int[10];
            //int[] res = new int[10];
            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(10, 100);
            //        Console.Write(mas[i, j] + " ");
            //        newMas[j] = mas[i, j];
            //    }
            //    res[i] = newMas.Max();
            //    Console.WriteLine();
            //}
            //Console.WriteLine();

            //foreach (int item in res)
            //{
            //    Console.Write(item + " ");
            //}

            //Console.WriteLine();
            //Console.WriteLine();
            //for (int i = 0; i < mas.GetLength(0); i++)
            //{
            //    int maximum = int.MinValue;
            //    for (int j = 0; j < mas.GetLength(1); j++)
            //    {
            //        mas[i, j] = rand.Next(10, 100);
            //        Console.Write(mas[i, j] + " ");
            //        if (mas[i, j] > maximum) maximum = mas[i, j];
            //    }
            //    res[i] = maximum;
            //    Console.WriteLine();
            //}
            //Console.WriteLine();
            //foreach (int item in res)
            //{
            //    Console.Write(item + " ");
            //}

            //Console.WriteLine(Factorial(5)); // - факториал из 5
            //Console.WriteLine(RecFact(5));

            //long Factorial(int n)
            //{
            //    long F = 1;
            //    for (int i = 1; i <= n; i++)
            //    {
            //        F *= i;
            //    }
            //    return F;
            //}

            //long RecFact(int n)
            //{
            //    if (n==0 || n==1)
            //    {
            //        return 1;
            //    }
            //    return n * RecFact(n - 1);
            //}


            ////Найти  сумму цифр числа

            //Console.WriteLine(Sum(37));

            //double Sum(int n)
            //{
            //    if (n < 10)
            //    {
            //        return n;
            //    }
            //    else
            //    {
            //        return n % 10 + Sum(n / 10);
            //    }
            //}

            //Найти кол во цифр ввведенного числа

            //Console.WriteLine(Count(12));

            //int Count(int n)
            //{
            //    if (n < 10)
            //    {
            //        return 1;
            //    }
            //    else
            //    {
            //        return 1 + Count(n / 10);
            //    }
            //}


            //Пример локальной функции

            //int Func(int a, int b, int c, int d, int e, int f)
            //{
            //    return (a*Fact(b)+c*Fact(b)) / (Fact(e)+Fact(f));

            //    int Fact(int n)
            //    {
            //        if (n == 0 || n == 1)
            //        {
            //            return 1;
            //        }
            //        else
            //        {
            //            return n * Fact(n - 1);
            //        }
            //    }
            //}

            //Новая запись свич

            //try
            //{
            //Console.Write("Введите номер дня недели: ");
            //int n = int.Parse(Console.ReadLine());
            //Console.WriteLine(DayWeek(n));
            //Console.WriteLine(DayWeekNew(n));
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}

            //string DayWeek(int n)
            //{
            //    string result;
            //    switch (n)
            //    {
            //        case 1: result = "Понедельник"; break;
            //        case 2: result = "Вторник"; break;
            //        case 3: result = "Среда"; break;
            //        case 4: result = "Четверг"; break;
            //        case 5: result = "Пятница"; break;
            //        case 6: result = "Суббота"; break;
            //        case 7: result = "Воскресенье"; break;
            //        default: result = "Нет такого дня"; break;
            //    }
            //    return result;
            //}

            //string DayWeekNew(int n)
            //{
            //    string s;
            //    return s = n switch
            //    {
            //        1 => "Понедельник",
            //        2 => "Вторник",
            //        3 => "Среда",
            //        4 => "Четверг",
            //        5 => "Пятница",
            //        6 => "Суббота",
            //        7 => "Воскресенье",
            //        _ => "Нет такого дня"
            //    };
            //}

            //13.1 

            //    People man = new People();
            //    man.name = "Виктор";
            //    man.surname = "Перестукин";
            //    Console.WriteLine(man.name + " " + man.surname);
            //    People superMan = new People()
            //    { name = "Артур", surname = "Худяков" };
            //    Console.WriteLine(superMan.name + " " + superMan.surname);
            //    People[] peoples = new People[5];
            //    for (int i = 0; i < 5; i++)
            //    {
            //        peoples[i] = new People();
            //        Console.Write($"Введите имя: {i + 1} ученика ");
            //        peoples[i].name = Console.ReadLine();
            //        Console.Write($"Введите фамилию: {i + 1} ученика ");
            //        peoples[i].surname = Console.ReadLine();
            //    }
            //    foreach (People item in peoples)
            //    {
            //        Console.WriteLine(item.name + " " + item.surname);
            //    }

            //    //13.3

            //    Cities[] cities = new Cities[5];
            //    for (int i = 0; i < 5; i++)
            //    {
            //        cities[i] = new Cities();
            //        Console.Write($"Введите название : {i + 1} города ");
            //        cities[i].NameCity = Console.ReadLine();
            //        Console.Write($"Введите название: {i + 1} страны ");
            //        cities[i].Country = Console.ReadLine();
            //    }
            //    foreach (Cities item in cities)
            //    {
            //        if (item.Country == "Италия")
            //        {
            //            Console.WriteLine(item.NameCity + " " + item.Country);
            //        }
            //    }
            //}

            //struct People
            //{
            //    public string name;
            //    public string surname;
            //}

            //struct Cities
            //{
            //    public string Country;
            //    public string NameCity;
            //}

            PhoneBookDigital[] adressa = new PhoneBookDigital[5];
            for (int i = 0; i < adressa.Length; i++)
            {
                adressa[i] = new PhoneBookDigital();
                Console.Write($"Введите название : {i + 1} фамилии ");
                adressa[i].surname = Console.ReadLine();
                Console.Write($"Введите название: {i + 1} адреса ");
                adressa[i].adress = Console.ReadLine();
                Console.Write($"Введите название: {i + 1} телефона ");
                adressa[i].phone = long.Parse(Console.ReadLine());
            }
            foreach (PhoneBookDigital item in adressa)
            {
                if (item.phone / 1000000 == 3)
                {
                    Console.WriteLine(item.surname + " " + item.adress + " " + item.phone);
                }
            }
        }
    }

    struct PhoneBookDigital
    {
        public string surname;
        public string adress;
        public long phone;

    }
}















