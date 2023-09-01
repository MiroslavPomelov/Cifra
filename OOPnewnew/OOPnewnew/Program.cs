namespace OOPnewnew
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Human runner = new Human();

            runner.SetAge(50);

            Console.WriteLine(runner.GetAge());
        }
    }

    class Human
    {
        private int _age;
        private int _height;
        private int _weight;

        public void SetAge(int value)
        {
            _age = value;
        }

        public int GetAge()
        {
            return _age;
        }
    }
}