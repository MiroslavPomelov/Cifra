namespace TaskManager10._11._2023
{
    public enum Role
    {
        admin,
        user
    }

    public enum CurrentStatus
    {
        complete,
        in_procces,
        expired
    }
    internal class TaskManagerApp
    {
        static void Main(string[] args)
        {

        }
    }

    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int Password { get; set; }
        public Role Role { get; set; }

        public User(int id, string userName, int password, Role role)
        {
            UserId = id;
            UserName = userName;
            Password = password;
            Role = role;
        }

        public void Login()
        {
            Console.WriteLine("Введите логин и пароль");
            int userPass = int.Parse(Console.ReadLine());
            string userNam = Console.ReadLine();
            if (UserName == userNam || Password == userPass)
            {
                Console.WriteLine("Вы авторизовались!");
            }
        }

        public void Logout()
        {
            Console.WriteLine("Вы вышли из аккаунта");
        }
    }

    public interface ITask
    {
        public void newTask(string taskName);
    }

    public interface IReportable
    {
        public string Report(string message);

        public void PrintReport()
        {
            throw new NotImplementedException();
        }
    }

    public abstract class TaskBase : ITask
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DeadLine { get; set; }
        public string AssignedTo { get; set; }

        public void Assign(User user)
        {

        }

        public void ChangeStatus(Status newStatus)
        {
          
        }

        public void newTask(string taskName)
        {

        }
    }

    public class Status
    {
        public CurrentStatus CurrentStatus { get; set; }
    }

    public class Task : TaskBase
    {
        public DateTime Date { get; set; }

    }

    public class Project
    {
        public int ProjectId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public List<Task> Tasks { get; set; }

        public void AddTask(Task task)
        {
            Tasks.Add(task);
        }

        public void RemoveTask(Task task)
        {
            Tasks.Remove(task);
        }
    }

    public class ReportGenerator : IReportable
    {
        public void GenerateTaskReport(Task task)
        {

        }

        public void GenerateProjectReport(Project project)
        {

        }

        public string Report(string message)
        {
            throw new NotImplementedException();
        }
    }
}