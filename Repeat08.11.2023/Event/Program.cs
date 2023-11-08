namespace Event
{
    internal class Program
    {
        public static event MyDelegateForEvent MyEvent;
        public delegate void MyDelegateForEvent(string message);
        static void Main(string[] args)
        {
            int[] numbers = new int[] { 1, 2, 3 };

            MyEvent += ShowIfEvent;

            foreach (int i in numbers)
            {
                if (i % 2 == 0)
                {
                    MyEvent?.Invoke("Четное");
                }
            }
        }

        public static void ShowIfEvent(string message)
        {
            Console.WriteLine(message);
            //race condition
            //abstract
            //interface
            //async await и thread разница?
            
        }
    }
}