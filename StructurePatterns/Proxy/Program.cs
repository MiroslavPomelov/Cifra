using Microsoft.EntityFrameworkCore;
namespace Proxy
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("Введите идентификатор пользователя для поиска: ");
                int userInputId = int.Parse(Console.ReadLine()!);

                if (userInputId == 404)
                {
                    break;
                }

                IPhoneBook phoneBook = new PhoneBookProxy();

                IPerson first = phoneBook.GetPersonById(userInputId);
                Console.WriteLine(first.GetInfo());

                Console.WriteLine("Нажмите Enter для продолжения...");
                Console.ReadKey();
            }
        }
    }
    public interface IPerson
    {
        string GetInfo();
    }

    public class Person : IPerson
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }

        public string GetInfo()
        {
            return $"Имя: {Name}\nНомер телефона: {PhoneNumber}";
        }
    }

    public class UnFindPerson : IPerson
    {
        public string GetInfo()
        {
            return $"Пользователь не найден";
        }
    }

    public class PersonDBContext : DbContext
    {
        public DbSet<Person>? People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var vers = new MySqlServerVersion(new Version(8, 0, 25));
            optionsBuilder.UseMySql("server=;database=;user=;password=", vers);
        }
    }

    interface IPhoneBook
    {
        IPerson GetPersonById(int id);
    }

    public class Phonebook : IPhoneBook
    {
        private PersonDBContext _peopleDataBase;

        public Phonebook()
        {
            _peopleDataBase = new PersonDBContext();
        }

        public IPerson GetPersonById(int id)
        {
            return _peopleDataBase?.People?.FirstOrDefault(p => p.Id == id)!;
        }
    }

    public class PhoneBookProxy : IPhoneBook
    {
        private readonly List<Person> _people;
        private Phonebook? _phoneBook;

        public PhoneBookProxy()
        {
            _people = new List<Person>();
        }

        public IPerson GetPersonById(int id)
        {
            IPerson concretePerson = _people?.FirstOrDefault(p => p.Id == id)!; // пытаемся сначала найти в кэшированном списке

            if (concretePerson is null) // Если пользователя в списке нет, ищем в базе данных
            {
                _phoneBook = new Phonebook();

                concretePerson = _phoneBook.GetPersonById(id);
                if (concretePerson is null) // Если нет и в БД, выводим сообщение о том, что пользователь не найден
                {
                    concretePerson = new UnFindPerson();
                }
            }
            return concretePerson!;
        }
    }
}