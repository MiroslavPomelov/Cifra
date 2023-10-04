namespace _04._10._2023Box_Unbox
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //int a = 6;

            //object refernce = a; //Упаковка из значимого в ссылку

            //int number = (int)refernce; // Распаковка из ссылки в значимый. dictionary[userName]++;

            //Person man = new Person();

            //object newMan = man; // Упаковка

            //Person someMan = (Person)newMan; // Распаковка





            //T - обобщение

            Operations<int> operations = new Operations<int>();

            //operations.Foo(2);
            Console.WriteLine(operations.GetMax(2, 3));




            IntegerCalculator integerCalculator = new IntegerCalculator();

            Console.WriteLine(integerCalculator.Substract(1, 2));
            Console.WriteLine(integerCalculator.Summ(2, 3));

        }
    }

    //class Person
    //{
    //    public int Id { get; set; }


    //}

    class Operations<T>
    {
        //public T Property { get; set; }



        //public T Foo<T>(T first)
        //{
        //    return first;
        //}


        public T GetMax<T>(T first, T second)
        {
            return Comparer<T>.Default.Compare(first, second) > 0 ? first : second;
        }
    }


    public abstract class Calculator<Tvalue> // Tvalue = T
    {
        public abstract Tvalue Summ(Tvalue firstVal, Tvalue secondVal);

        public abstract Tvalue Substract(Tvalue firstVal, Tvalue secondVal);
    }

    //public abstract class Calculator<TfirstVal, TsecondVal> // 
    //{
    //    public abstract Tvalue Summ(Tvalue firstVal, Tvalue secondVal);

    //    public abstract Tvalue Substract(Tvalue firstVal, Tvalue secondVal);
    //}

    public class IntegerCalculator:Calculator<int>
    {
        public override int Summ(int firstVal, int secondVal)
        {
           return firstVal + secondVal;
        }

        public override int Substract(int firstVal, int secondVal)
        {
            return firstVal - secondVal;
        }
    }
}