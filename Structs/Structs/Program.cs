using System.Text;

namespace Structs
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //   // 13.12

            //    Employer[] peoples = new Employer[5];
            //    Random random = new Random();

            //    for (int i = 0; i < peoples.Length; i++)
            //    {
            //        peoples[i] = new Employer();
            //        peoples[i].name = getString(random.Next(5, 15));
            //        Console.WriteLine(peoples[i].name);
            //        peoples[i].surname = getString(random.Next(5, 15));
            //        Console.WriteLine(peoples[i].surname);
            //        peoples[i].lastname = getString(random.Next(5, 15));
            //        Console.WriteLine(peoples[i].lastname);
            //        peoples[i].address = getString(random.Next(10, 50));
            //        Console.WriteLine(peoples[i].address);
            //        MyDate myDate = new MyDate();
            //        myDate.month = random.Next(1, 13);
            //        myDate.year = random.Next(2010, 2023);
            //        peoples[i].date = myDate;
            //        Console.WriteLine(peoples[i].date.month + "." + peoples[i].date.year);
            //        Console.WriteLine();
            //    }

            //    Console.Write("Введите текущий год: ");
            //    int year = int.Parse(Console.ReadLine());
            //    Console.WriteLine();

            //    foreach (Employer item in peoples)
            //    {
            //        if (year - item.date.year > 3)
            //        {
            //            Console.WriteLine(item.name +'\n'+item.surname +'\n'+item.lastname + '\n'+ item.address+'\n');
            //        }
            //    }

            //    string getString(int n)
            //    {
            //        StringBuilder str = new StringBuilder();
            //        str.Append((char)random.Next(1040, 1072));
            //        for (int i = 0; i < n - 1; i++)
            //        {
            //            str.Append((char)random.Next(1072, 1104));
            //        }
            //        return str.ToString();
            //    }
            //}

            //struct MyDate
            //{
            //    public int month;
            //    public int year;
            //}

            //struct Employer
            //{
            //    public string name;
            //    public string surname;
            //    public string lastname;
            //    public string address;
            //    public MyDate date;
            //}




            //// 13. 

            //Tovar[] tovars = new Tovar[5];
            //Random random = new Random();
            //for (int i = 0; i < 5; i++)
            //{
            //    tovars[i] = new Tovar();
            //    tovars[i].name = getString(random.Next(4, 10));
            //    tovars[i].rub = random.Next(100, 1000);
            //    tovars[i].kop = random.Next(0, 100);
            //    Console.WriteLine(tovars[i].name + " = " + tovars[i].rub + ". " + tovars[i].kop);
            //}

            //for (int i = 0; i < tovars.Length; i++)
            //{
            //    for (int j = i + 1; j < tovars.Length; j++)
            //    {
            //        if (tovars[i].rub * 100 + tovars[i].kop < tovars[j].rub * 100 + tovars[j].kop)
            //        {
            //            Tovar temp = tovars[i];
            //            tovars[i] = tovars[j];
            //            tovars[j] = temp;
            //        }
            //    }
            //}

            //Console.WriteLine();

            //foreach (Tovar tovar in tovars)
            //{
            //    Console.WriteLine(tovar.name + " = " + tovar.rub + ". " + tovar.kop);
            //}

            //string getString(int n)
            //{
            //    StringBuilder str = new StringBuilder();
            //    str.Append((char)random.Next(1040, 1072));
            //    for (int i = 0; i < n - 1; i++)
            //    {
            //        str.Append((char)random.Next(1072, 1104));
            //    }
            //    return str.ToString();
            //}



            //13.19

            //    Pupil[] pupils = new Pupil[20];
            //    Random random = new Random();

            //    for (int i = 0; i < 5; i++)
            //    {
            //        pupils[i].name = getString(random.Next(4, 10));
            //        pupils[i].surname = getString(random.Next(4, 10));
            //        pupils[i].lastname = getString(random.Next(4, 10));
            //        pupils[i].day = random.Next(1, 31);
            //        pupils[i].month = random.Next(1, 13);
            //        pupils[i].year = random.Next(2000, 2018);
            //        Console.WriteLine(pupils[i].name + " " + pupils[i].surname + " " + pupils[i].lastname + " " + pupils[i].day + "." + pupils[i].month + "." + pupils[i].year);
            //    }

            //    Console.WriteLine();
            //    Console.Write("Введите день: ");
            //    int day = int.Parse(Console.ReadLine());
            //    Console.Write("Введите месяц: ");
            //    int month = int.Parse(Console.ReadLine());
            //    Console.WriteLine();

            //    for (int i = 0; i < 5; i++)
            //    {
            //        if (pupils[i].day == day && pupils[i].month == month)
            //        {

            //                Console.WriteLine(pupils[i].name + " " + pupils[i].surname + " " + pupils[i].lastname + " " + pupils[i].day + "." + pupils[i].month + "." + pupils[i].year);
            //        }
            //    }

            //    string getString(int n)
            //    {
            //        StringBuilder str = new StringBuilder();
            //        str.Append((char)random.Next(1040, 1072));
            //        for (int i = 0; i < n - 1; i++)
            //        {
            //            str.Append((char)random.Next(1072, 1104));
            //        }
            //        return str.ToString();
            //    }
            //}


        }

    }

    //struct Tovar
    //{
    //    public string name;
    //    public int rub;
    //    public int kop;
    //}


    //struct Pupil
    //{
    //    public string name;
    //    public string surname;
    //    public string lastname;
    //    public int day;
    //    public int month;
    //    public int year;
    //}


}

