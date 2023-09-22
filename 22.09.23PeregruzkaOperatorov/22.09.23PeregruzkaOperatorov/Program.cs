namespace _22._09._23PeregruzkaOperatorov
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //public static name operator _знак

            SomeClass someClass = new SomeClass();
            someClass.firstValue = -40;
            //someClass.secondValue = 30;


            Second second = new Second();
            second.someValue = 25;
            Console.WriteLine(someClass > second);
        }
    }

    class SomeClass
    {
        //public int firstValue;
        //public int secondValue;

        //public static int operator +(SomeClass firstParam, SomeClass secondParam)
        //{
        //    return firstParam.firstValue + secondParam.secondValue;
        //}

        public int firstValue;
        public static bool operator >(SomeClass first, Second second)
        {
            if (first.firstValue < 0)
            {
                Console.WriteLine("Число меньше нуля");
                return false;
            }
            return first.firstValue > second.someValue;
        }
        public static bool operator <(SomeClass first, Second second)
        {
            return first.firstValue < second.someValue;
        }
    }

    class First
    {
        public int someValue;
    }
    class Second
    {
        public int someValue;
    }
}