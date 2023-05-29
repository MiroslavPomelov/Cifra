using (BinaryWriter writer = new BinaryWriter(File.Open("employers.txt", FileMode.OpenOrCreate)))
{
    Employe employe = new Employe();
    employe.date = new DateOnly();

    Employe[] rob = new Employe[3];
    for (int i = 0; i < rob.Length; i++)
    {
        Console.Write("Введите фамилию: ");
        rob[i].surname = Console.ReadLine();
        writer.Write(rob[i].surname);
        Console.Write("Введите должность: ");
        rob[i].level = Console.ReadLine();
        writer.Write(rob[i].level);
        Console.Write("Введите образование: ");
        rob[i].edu = Console.ReadLine();
        writer.Write(rob[i].edu);
        Console.Write("Введите дату поступление на работу: ");
        rob[i].date = DateOnly.Parse(Console.ReadLine());
        writer.Write(rob[i].date.ToString());
        Console.Write("Введите пол: ");
        rob[i].sex = Console.ReadLine();
        writer.Write(rob[i].sex);
        Console.WriteLine();
    }
}

using (BinaryReader reader = new BinaryReader(File.Open("employers.txt", FileMode.Open)))
{
    for (int i = 0; i < 3; i++)
    {
        int d = reader.Read();
        Console.Write(d + " ");
    }
    Console.WriteLine();
}


struct Employe
{
    public string surname;
    public string level;
    public string edu;
    public DateOnly date;
    public string sex;
}