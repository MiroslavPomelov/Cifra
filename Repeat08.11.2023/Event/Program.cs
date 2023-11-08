namespace Event
{
    internal class Program
    {
        public event MyDelegateForEvent MyEvent;
        static void Main(string[] args)
        {

        }

        public static void ShowIfEvent(string message)
        {
            Console.WriteLine(message);
        }
    }
    public delegate void MyDelegateForEvent(string message);
}