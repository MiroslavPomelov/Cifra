//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    writer.Write("Tom");
//    writer.Write(17);
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    string name = reader.ReadString();
//    int age = reader.ReadInt32();
//    Console.WriteLine(name + " " + age);
//}

//14.1

//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    writer.Write("500");
//    writer.Write(4.5);
//    writer.Write("Привет");
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    int age = reader.ReadInt32();
//    double next = reader.ReadDouble();
//    string text = reader.ReadString();
//    Console.WriteLine(age + " " +next+" " + age);
//}

//14.2 Ввести 5 значений и вывести их

//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    for (int i = 0; i < 5; i++)
//    {
//        writer.Write(int.Parse(Console.ReadLine()));
//    }
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    for (int i = 0; i < 5; i++)
//    {
//        int d = reader.ReadInt32();
//        Console.Write(d+" ");
//    }
//    Console.WriteLine();
//}


//14.5 


//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    double[] mas = new double[20];
//    Random random = new Random();
//    for (int i = 0; i < mas.Length; i++)
//    {
//        mas[i] = double.Parse($"{random.NextDouble()*10:F2}");
//        writer.Write(mas[i]);
//    }
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    double[] from = new double[20];
//    for (int i = 0; i < from.Length; i++)
//    {
//        from[i] = reader.ReadDouble();
//        Console.WriteLine(from[i]+" ");
//    }
//    Console.WriteLine();
//}


//14.7

//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    Random rnd = new Random();
//    int n = 0;
//    do
//    {
//        n = rnd.Next(-10, 11);
//        //if (n == 0)
//        //{
//        //    break;
//        //}
//        writer.Write(n);
//    }
//    while (n != 0);
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    int n = 0;
//    do
//    {
//        n=reader.ReadInt32();
//        Console.Write(n+" ");
//    }
//    while (n!=0);
//}


//14.11


//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    Random rnd = new Random();
//    int n = 0;
//    do
//    {
//        n = rnd.Next(-10, 11);
//        //if (n == 0)
//        //{
//        //    break;
//        //}
//        writer.Write(n);
//        Console.Write(n + " ");
//    }
//    while (n != 0);
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    int n = int.Parse(Console.ReadLine());
//    int count = 0;
//    int last = 0;

//    while (reader.PeekChar() > -1)
//    {
//        count++;
//        last = reader.ReadInt32();
//        if (count == 1)
//        {
//            Console.WriteLine(last);
//        }
//        if (count == 3)
//        {
//            Console.WriteLine(last);
//        }
//        if (count == n)
//        {
//            Console.WriteLine(last);
//        }
//    }
//    Console.WriteLine(last);
//}


////14.

//Console.Write("Введите количество элементов в массиве: ");
//int n = int.Parse(Console.ReadLine());
//Person[] mas = new Person[n];

//for (int i = 0; i < mas.Length; i++)
//{
//    mas[i].Name = Console.ReadLine();
//    mas[i].Age = int.Parse(Console.ReadLine());

//}

//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    foreach (Person p in mas)
//    {
//        writer.Write(p.Name);
//        writer.Write(p.Age);
//    }
//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    while (reader.PeekChar() > -1)
//    {
//        Console.WriteLine(reader.ReadString() + " " + reader.ReadInt32());
//    }
//}

//struct Person
//{
//    public string Name;
//    public int Age;
//}


//1


//Console.Write("Введите количество студентов: ");
//int n = int.Parse(Console.ReadLine());
//Student[] mas = new Student[n];
//Random random = new Random();

//for (int i = 0; i < mas.Length; i++)
//{
//    Console.Write("Имя студента: ");
//    mas[i].Fio = Console.ReadLine();
//    Console.Write("Номер группы студента: ");
//    mas[i].Number = int.Parse(Console.ReadLine());
//    Console.Write("Успеваемость студента: ");
//    mas[i].Marks = new int[3];
//    for (int j= 0; j < mas[i].Marks.Length; j++)
//    {
//        mas[i].Marks[j] = random.Next(3, 6);

//    }
//    Console.Write("Степендия студента: ");
//    mas[i].salary = decimal.Parse(Console.ReadLine());

//}

//using (BinaryWriter writer = new BinaryWriter(File.Open("file.dat", FileMode.OpenOrCreate)))
//{
//    foreach (Student p in mas)
//    {
//        writer.Write(p.Fio);
//        writer.Write(p.Number);
//        for (int i = 0; i < p.Marks.Length; i++)
//        {

//            writer.Write(p.Marks[i]);
//        }
//        writer.Write(p.salary);

//    }

//}

//using (BinaryReader reader = new BinaryReader(File.Open("file.dat", FileMode.Open)))
//{
//    while (reader.PeekChar() > -1)
//    {
//        string fio = reader.ReadString();
//        int number = reader.ReadInt32();
//        int[] studMarks = new int[3];
//        bool isTrue = true;
//        for (int i = 0; i < 3; i++)
//        {
//            studMarks[i] = reader.ReadInt32();
//            if (studMarks[i] == 3)
//            {
//                isTrue = false;
//            }
//        }
//        decimal salary = reader.ReadDecimal();
//        if (isTrue)
//        {
//            Console.WriteLine(fio + " " + number + " " + studMarks[0] + " " + studMarks[1] + " " + studMarks[2] + " " + salary);
//        }
//    }
//}

//struct Student
//{
//    public string Fio;
//    public int Number;
//    public int[] Marks;
//    public decimal salary;
//}



//1

int count = 0;
using (BinaryWriter writer = new BinaryWriter(File.Open("text.dat", FileMode.OpenOrCreate)))
{
    Random random = new Random();
    int n;
    do
    {
        n = random.Next(-10, 11);
        writer.Write(n);
        count++;
        Console.Write(n+" ");
    }
    while (n != 0);
}

int[] mas = new int[count];
using (BinaryReader reader = new BinaryReader(File.Open("text.dat", FileMode.Open)))
{
    for (int i = 0; i < count; i++)
    {
        mas[i] = reader.ReadInt32();
        mas[i] *= 2;
    }
}

using (BinaryWriter writer = new BinaryWriter(File.Open("text.dat", FileMode.Open,FileAccess.Write)))
{
    foreach (int item in mas)
    {
        writer.Write(item);
    }
}

using (BinaryReader reader = new BinaryReader(File.Open("text.dat", FileMode.Open)))
{
    for (int i = 0; i < count; i++)
    {
        Console.Write(reader.ReadInt32()+" ");
    }
}