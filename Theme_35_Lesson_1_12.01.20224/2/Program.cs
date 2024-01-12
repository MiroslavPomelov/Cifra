namespace _2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Upcast
            List<Animal> animals = new List<Animal>()
            {
                new Animal("Animal",20),
                new Dog("Chaffie", 10, "Woof"),
                new Cat("Barsik", 7, "Meow"),
                new Dragon("Smaug", 1500, "AAA")
            };

            // Фильрация линк
            var items = animals.OfType<Dog>();

            foreach (var item in items)
            {
                Console.WriteLine(item.Name);
            }
        }
    }

    public class Animal
    {
        public string Name { get; set; }
        public double Weight { get; set; }

        public Animal(string name, double weight)
        {
            Name = name;
            Weight = weight;
        }
    }

    public class Dog : Animal
    {
        public string Noise { get; set; } = "Woof";
        public Dog(string name, double weight, string noise) : base(name, weight)
        {
            Noise = noise;
        }
    }

    public class Cat : Animal
    {
        public string Noise { get; set; } = "Meow";
        public Cat(string name, double weight, string noise) : base(name, weight)
        {
            Noise = noise;
        }
    }

    public class Dragon : Animal
    {
        public string Noise { get; set; } = "AAAAAA";
        public Dragon(string name, double weight, string noise) : base(name, weight)
        {
            Noise = noise;
        }
    }
}