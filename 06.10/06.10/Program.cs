using System.Drawing;

namespace _06._10
{
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }

    abstract class People
    {
        protected abstract int Age { get; set; }

        protected abstract string Name { get; set; }

        public abstract DateTime GetBirthDate();

    }

    class Person : People
    {
        protected override int Age { get; set; }
        protected override string Name { get; set; }

        public override DateTime GetBirthDate()
        {
            return DateTime.Now - Age.;
        }
    }

    //public interface Isinger // I - интерфейс, не наследует а реализует
    //{
    //    void Sing();

    //    void Applause();
    //}

    //Iloger logger = new FileLogger(); // Создание интерфейса класса

    public interface ILoger1
    {
        void LogMessage(string v);
    }

    public interface ILoger2
    {
        void LogMessage(string v);
    }

    class FileLogger : ILoger1, ILoger2
    {
        void ILoger1.LogMessage(string v) // Обращение к определенному интерфейсу
        {
            Console.WriteLine(v);
        }

        void ILoger2.LogMessage(string v)
        {
            Console.WriteLine(v);
        }
    }



    public interface Idrawable
    {
        void Draw();
    }

    public abstract class Shape : Idrawable
    {
        public abstract void Draw();

        public abstract double Square { get; set; }
    }

    public class Circle : Shape
    {
        public override void Draw()
        {
            Console.WriteLine("Рисую");
        }

        public override double Square { get; set; }
    }




    public interface IFly
    {
        void Flying();
    }

    public abstract class Birds : IFly
    {
        public abstract void Flying();

        public abstract Color Color { get; set; }
    }

    class Parrot : Birds
    {
        public override void Flying()
        {
            Console.WriteLine("Летаю");
        }
        public override Color Color { get; set; }
    }
}