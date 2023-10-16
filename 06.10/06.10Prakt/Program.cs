using System.Data;
using System.Threading.Tasks;

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
            TaskManager manager = new TaskManager();
            manager.AddTask(new Task("Поход к врачу", new DateTime(2023, 01, 12), Priority.Low));
            manager.AddTask(new Task("Поход в магаз", new DateTime(2023, 10, 25), Priority.Medium));
            manager.AddTask(new Task("Поход в школу", new DateTime(2023, 05, 1), Priority.High));

            manager.GetAllLists();
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

        public Task(string title, DateTime dueDate, Priority priority)
        {
            Title = title;
            DueDate = dueDate;
            Priority = priority;
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

        public Event(string title, DateTime dueDate, int priority, string location)
        {
            Title = title;
            DueDate = dueDate;
            Priority = (Priority)priority;
            Location = location;
        }
    }

    class TaskManager
    {
        public List<ITask> DataLists = new List<ITask>();

        public void AddEvent(Event SomeEvent)
        {
            DataLists.Add(SomeEvent);
        }
        public void RemoveEvent()
        {

        }

        public void AddTask(Task task)
        {
            DataLists.Add(task);
        }
        public void RemoveTask(Task task)
        {

        }

        public TaskManager()
        {
            DataLists = new List<ITask>();
        }

        public void Sorting()
        {
            DataLists.Sort();
        }

        public void GetAllLists()
        {
            foreach (var item in DataLists)
            {
                Console.WriteLine(
                    "{0}\n{1}\n{2}\n",
                    item.Title,
                    item.DueDate,
                    item.Priority
                    );
            }
        }
    }
}