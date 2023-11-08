namespace MegaInterfaces
{
    internal class Program
    {
        static void Main(string[] args)
        {
            GenericClass<string, long> genClass = new GenericClass<string, long>();

            genClass.Foo<int>(13);

           
        }
    }

    class GenericClass<TFirst, TSecond>
    {
        public TFirst Id { get; set; }
        public TSecond Name { get; set; }

        public T Foo<T>(T value)
        {
            Console.WriteLine(Id);
            return value;
        }
    }
}