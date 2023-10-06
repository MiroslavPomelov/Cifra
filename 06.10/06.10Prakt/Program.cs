namespace _06._10Prakt
{
    public enum Priority
    {
        High,
        Medium,
        Low
    }
    internal class Program
    {
        static void Main(string[] args)
        {

        }
    }


    public interface ITask
    {
        string Title { get; set; }

        DateTime DueDate { get; set; }

        Priority Priority { get; set; }

        void Display();
    }


    class Task : ITask
    {
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public void Display()
        {
            Console.WriteLine("");
        }
    }

    class Event : ITask
    {
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public string Location { get; set; }

        public void Display()
        {
            Console.WriteLine("");
        }
    }
}