using System.Text;

namespace _15._05._23
{
    //enum Operation
    //{
    //    Add = 1,
    //    Subtract,
    //    Multiply,
    //    Divide
    //}

    //enum apple
    //{
    //    Janathan,
    //    GoldenDe1,
    //    RedDe1,
    //    Winsap,
    //    Cortland,
    //    McIntosh
    //}

    enum Pol
    {
        Мужской,
        Женский
    }

    enum Position
    {
        Директор,
        Бухгалтер,
        Менеджер,
        Кладовщик,
        Дворник
    }

    struct Employer
    {
        public int number;
        public string fio;
        public DateOnly birthDay;
        public Pol pol;
        public DateTime start;
        public Position position;
        public decimal salary;
    }

    internal class Program
    {
        static void Main(string[] args)
        {

            //Operation op;
            //op = Operation.Add;
            //Console.WriteLine(op);
            //op = Operation.Multiply;
            //Console.WriteLine((int)op);

            //Console.Write("Введите первое число: ");
            //double a = double.Parse(Console.ReadLine());
            //Console.Write("Введите второе число: ");
            //double b = double.Parse(Console.ReadLine());
            //Console.WriteLine(MathOperation(a, b, Operation.Add));
            //Console.WriteLine(MathOperation(a, b, Operation.Subtract));
            //Console.WriteLine(MathOperation(a, b, Operation.Multiply));
            //Console.WriteLine(MathOperation(a, b, Operation.Divide));

            //Console.WriteLine();

            //for (Operation i = Operation.Add; i <= Operation.Divide; i++)
            //{
            //    Console.WriteLine((int)i + " " + i);
            //}


            //double MathOperation(double x, double y, Operation op)
            //{
            //    double result = 0;
            //    switch (op)
            //    {
            //        case Operation.Add:
            //            result = x + y;
            //            break;
            //        case Operation.Subtract:
            //            result = x - y;
            //            break;
            //        case Operation.Multiply:
            //            result = x * y;
            //            break;
            //        case Operation.Divide:
            //            result = x / y;
            //            break;
            //        default:
            //            break;
            //    }
            //    return result;
            //}


            //string[] color = { "красный", "желтый", "красный", "красный", "красный", "красно - зеленый" };

            //apple i; // Объявляем перменную перечислимого типа
            //         // Используем переменную i для обхода всех членов перечисления

            //for (i = apple.Janathan; i <= apple.McIntosh; i++)
            //{
            //    Console.WriteLine(i + " имеет значение " + (int)i);
            //    Console.WriteLine();
            //    // Используем перечисление для индексации массива
            //    for (i = apple.Janathan; i <= apple.McIntosh; i++)
            //    {
            //        Console.WriteLine("Цвет сорта " + i + " - " + color[(int)i]);
            //    }
            //}




            // Средний уровень #1

            //Console.Write("Введите количество сеансов: ");
            //int n = int.Parse(Console.ReadLine());
            //Seanse[] seanses = new Seanse[n];
            //Random random = new Random();

            //for (int i = 0; i < n; i++)
            //{
            //    Console.Write("Введите позывной: ");
            //    seanses[i].name = Console.ReadLine();
            //    Console.Write("Введите частоту: ");
            //    seanses[i].frequency = double.Parse(Console.ReadLine());
            //    Console.Write("Введите дату: ");
            //    seanses[i].data = DateOnly.Parse(Console.ReadLine());
            //    Console.Write("Введите время начала сеанса: ");
            //    seanses[i].start = TimeOnly.Parse(Console.ReadLine());
            //    Console.Write("Введите время окончание сеанса: ");
            //    seanses[i].end = TimeOnly.Parse(Console.ReadLine());
            //    Console.Write("Введите количество переданных групп: ");
            //    seanses[i].count = int.Parse(Console.ReadLine());

            //    seanses[i].mas = new string[seanses[i].count];
            //    for (int j = 0; j < seanses[i].mas.Length; j++)
            //    {
            //        StringBuilder sb = new StringBuilder();
            //        sb.Append((char)random.Next(60, 85) + "" + (char)random.Next(60, 85) + "" + (char)random.Next(60, 85) + "" + (char)random.Next(60, 85) + "" + (char)random.Next(60, 85));
            //        seanses[i].mas[j] = sb.ToString();
            //        Console.WriteLine(seanses[i].mas[j]);
            //    }
            //}

            //Console.WriteLine();

            //Console.WriteLine("Информация о скорости передачи групп: ");

            //for (int i = 0; i < n; i++)
            //{
            //    int m1 = seanses[i].start.Hour * 60 + seanses[i].start.Minute;
            //    int m2 = seanses[i].end.Hour * 60 + seanses[i].end.Minute;
            //    //Console.WriteLine($"Сеанс {i + 1}:{(double)seanses[i].count / (seanses[i].end.Minute - seanses[i].start.Minute):F2}");
            //    Console.WriteLine($"Сеанс {i + 1}:{(double)seanses[i].count / (m2 - m1):F2}");
            //}

            //Console.WriteLine();

            //Console.Write("Введите дату");
            //DateOnly data = DateOnly.Parse(Console.ReadLine());
            //Console.Write("Введите начало: ");
            //TimeOnly timeStart = TimeOnly.Parse(Console.ReadLine());
            //Console.Write("Введите время окончания: ");
            //TimeOnly timeFinish = TimeOnly.Parse(Console.ReadLine());

            //for (int i = 0; i < n; i++)
            //{
            //    if (seanses[i].data == data && timeStart < seanses[i].start && timeFinish > seanses[i].end)
            //    {
            //        Console.WriteLine(seanses[i].start + " - " + seanses[i].end);
            //    }
            //}

            // 2

            Console.Write("Введите количество сторудников: ");
            int n = int.Parse(Console.ReadLine());
            Employer[] employers = new Employer[n];

            for (int i = 0; i < n; i++)
            {
                Console.Write("Введите табельный номер: ");
                employers[i].number = int.Parse(Console.ReadLine());
                Console.Write("Введите ФИО: ");
                employers[i].fio = (Console.ReadLine());
                Console.Write("Введите дату рождения: ");
                employers[i].birthDay = DateOnly.Parse(Console.ReadLine());
                Console.Write("Введите пол 1 - мужской, 2 - женский: ");
                int p = int.Parse(Console.ReadLine());
                if (p == 1)
                {
                    employers[i].pol = Pol.Мужской;
                }
                else
                {
                    employers[i].pol = Pol.Женский;
                }

                Console.Write("Введите дату начала работы: ");
                employers[i].start = DateTime.Parse(Console.ReadLine());
                Console.Write("Введите должность 1 - директор, 2 - бухгалтер, 3 - менеджер, 4 - кладовщик, 5 - дворник ");
                int d = int.Parse(Console.ReadLine());
                switch (d)
                {
                    case 1:
                        employers[i].position = Position.Директор;
                        break;
                    case 2:
                        employers[i].position = Position.Бухгалтер;
                        break;
                    case 3:
                        employers[i].position = Position.Менеджер;
                        break;
                    case 4:
                        employers[i].position = Position.Кладовщик;
                        break;
                    case 5:
                        employers[i].position = Position.Дворник;
                        break;
                }
                Console.Write("Введите оклад: ");
                employers[i].salary = decimal.Parse(Console.ReadLine());
            }

            for (int i = 0; i < n; i++)
            {
                Console.WriteLine("ФИО: " + employers[i].fio);
                int age = DateTime.Now.Year - employers[i].birthDay.Year;
                Console.WriteLine("Возраст" + age);
                int dayNow = DateTime.Now.Subtract(DateTime.MinValue).Days;
                DateTime start = DateTime.Parse(employers[i].start.ToString());
                int dayStart = start.Subtract(DateTime.MinValue).Days;
                Console.WriteLine("Количество отработанных дней: " + (dayNow - dayStart));
            }

            for (int i = 0; i < n; i++)
            {
                int age = DateTime.Now.Year - employers[i].birthDay.Year;
                int dayNow = DateTime.Now.Subtract(DateTime.MinValue).Days;
                DateTime start = DateTime.Parse(employers[i].start.ToString());
                int dayStart = start.Subtract(DateTime.MinValue).Days;
                int stage = dayNow - dayStart;
                if (((age > 60 && employers[i].pol == Pol.Мужской) || (age > 55 && employers[i].pol == Pol.Женский)) && (stage > 30))
                {
                    Console.WriteLine(employers[i].fio);
                }
            }





            //struct Seanse
            //{
            //    public string name;
            //    public double frequency;
            //    public DateOnly data;
            //    public TimeOnly start;
            //    public TimeOnly end;
            //    public int count;
            //    public string[] mas;
            //}
        }
    }
}