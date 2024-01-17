namespace Theme_35_Lesson_4_OOPTasks
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Animal tiger = new Animal { Name = "Tiger",Species= "Cat", Weight = 90};
            //Animal lion = new Animal { Name = "Lion", Species = "Cat", Weight = 120 };
            //Animal monkey = new Animal{ Name = "Monkey", Species = "Monk", Weight = 20 };

            //Console.WriteLine($"{tiger.Name} {tiger.Species} {tiger.Weight}");
            //Console.WriteLine($"{lion.Name} {lion.Species} {lion.Weight}");
            //Console.WriteLine($"{monkey.Name} {monkey.Species} {monkey.Weight}");

            //Animal any = new Animal("asdasd","sadasd", 23);

            //any.makeSound("Sound");

            //List<Goods> tasks = new List<Goods>()
            //{
            //    new Krups("Good", 60, "OOO GRECHKA", Variety.Grechka),
            //    new Krups("Bulgur", 60, "OOO BULGUR", Variety.Bulgur),
            //    new Fruits("Apple", 25, "IP FRUITS", 1.3),
            //    new Fruits("Lemon", 25, "IP FRUITS", 0),
            //    new Drinks("Cola",80, "OOO PEPSICO", Drink.Gaz),
            //    new Drinks("Water",80, "OOO PEPSICO", Drink.NoGaz)
            //};


            List<Fruit> fruits = new List<Fruit>()
            {
                new Fruit("Fruit", 20),
                new Fruit("Fruit", 25),
                new Fruit("Fruit", 30)
            };
        }
    }
}