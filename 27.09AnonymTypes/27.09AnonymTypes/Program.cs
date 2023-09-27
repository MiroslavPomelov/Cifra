namespace _27._09AnonymTypes
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SomeClass someClass = new SomeClass();
            someClass.ShowSomeValue();
            someClass.GetSomeValue();
        }
    }

    public static class Shower
    {
        public static void Show(this int value)
        {
            Console.WriteLine(value);
        }

        public static int Get(this int value)
        {
            return value;
        }
    }

    class SomeClass
    {
        public int someValue = 15;

        public int GetSomeValue()
        {
            return someValue.Get();
        }

        public void ShowSomeValue()
        {
            someValue.Show();
        }
    }
    //public static class Shower
    //{
    //    public static void Show(this int someValue)
    //    {
    //        Console.WriteLine(someValue);
    //    }
    //}
}