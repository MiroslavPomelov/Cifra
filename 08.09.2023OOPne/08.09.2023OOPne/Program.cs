namespace _08._09._2023OOPne
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Person person = new Person();

            person.Name = "Qwerty";

            person.Age = int.Parse(Console.ReadLine());

        }
    }

    class Person
    {
        private string _name;
        private int _age;
        private int _phoneNimber;
        private string _adress;

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        public int Age
        {
            get { return _age; }
            set
            {
                if (value < 0 || value > 200)
                {
                    Console.WriteLine("Не может быть отрицательным или больше 200");
                }
                else
                {
                    Console.WriteLine($"Current _age: {_age} reverse to {value}");
                    _age = value;
                }
            }
        }

    }
}