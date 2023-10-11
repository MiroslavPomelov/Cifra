namespace _11._10._2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            GeneralClass<string> general = new GeneralClass<string>();
            general.GeneralFieldOne = "Hello";
            general.GeneralFieldTwo = "Friend";

            ChildClass child = new ChildClass();
            child.GeneralFieldTwo = 23;
            child.GeneralFieldOne = 10;
        }

        //<> where T : - ограничение Т
    }

    class GeneralClass<T>
    {
        public T GeneralFieldOne { get; set; }
        public T GeneralFieldTwo { get; set;}

    }

    class ChildClass:GeneralClass<int>
    {

    }

    //public class MyClass<T> where T:class - принимает только класс
}