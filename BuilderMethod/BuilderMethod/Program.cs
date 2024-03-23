using System.ComponentModel;

namespace BuilderMethod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IAssempler director = new CustomSquadAssembler();

            IPersonBuilder personBuilder = new SquadBuilder();
            director.Assembly(personBuilder);

            CompletePerson completePerson = personBuilder.GetComplect();
            completePerson.Show();

        }
    }

    class CompletePerson
    {
        public List<Person> Person { get; } = new List<Person>();

        public void AddPerson(Person item)
        {
            Person.Add(item);
        }

        public void Show()
        {
            Console.WriteLine("Создание:");
            foreach (var item in Person)
            {
                Console.WriteLine($"- {item.Name} {item.Class}");
            }
        }
    }

    // Строитель
    interface IPersonBuilder
    {
        IPersonBuilder BuildWarrior();
        IPersonBuilder BuildArcher();
        IPersonBuilder BuildMage();
        CompletePerson GetComplect();
    }

    // Конкретный строитель
    class SquadBuilder : IPersonBuilder
    {
        private CompletePerson _set = new CompletePerson();

        public IPersonBuilder BuildWarrior()
        {
            _set.AddPerson(new Warrior("Warrior",10,"Воин"));
            return this;
        }

        public IPersonBuilder BuildArcher()
        {
            _set.AddPerson(new Archer("Archer", 15, "Лучник"));
            return this;
        }

        public IPersonBuilder BuildMage()
        {
            _set.AddPerson(new Mage("Mage", 12, "Маг"));
            return this;
        }

        public CompletePerson GetComplect()
        {
            return _set;
        }
    }

    interface IAssempler
    {
        void Assembly(IPersonBuilder builder);
    }

    // Директор
    class CustomSquadAssembler : IAssempler
    {
        public void Assembly(IPersonBuilder builder)
        {
            builder.BuildWarrior()
                   .BuildArcher()
                   .BuildMage();
        }
    }

    // Базовый класс для персонажей
    abstract class Person
    {
        public string Name { get; set; }
        public string Class { get; set; }

        protected Person(string name, string clas)
        {
            Name = name;
            Class = clas;
        }
    }

    // Войн
    class Warrior : Person
    {
        public string Name { get; set; }
        public int lvl { get; set; }
        public int clas { get; set; }


        public Warrior(string name, int lvl, string clas)
            : base(name, clas)
        {
            Name = name;
            this.lvl = lvl;
        }
    }

    // Лучник
    class Archer : Person
    {
        public string Name { get; set; }
        public int lvl { get; set; }
        public int clas { get; set; }


        public Archer(string name, int lvl, string clas)
            : base(name, clas)
        {
            Name = name;
            this.lvl = lvl;
        }
    }

    // Маг
    class Mage : Person
    {
        public string Name { get; set; }
        public int lvl { get; set; }
        public int clas { get; set; }


        public Mage(string name, int lvl, string clas)
            : base(name, clas)
        {
            Name = name;
            this.lvl = lvl;
        }
    }   
}