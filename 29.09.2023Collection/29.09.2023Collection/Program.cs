namespace _29._09._2023Collection
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();

            //Stack<int> intsStack = new Stack<int>();

            //  intsStack.Push(10);
            //  intsStack.Push(20);
            //  intsStack.Push(30);
            //  intsStack.Push(40);
            //  intsStack.Push(50);

            //  Console.WriteLine(intsStack.Pop()); //Вывод 1го элемента
            //  Console.WriteLine(intsStack.Count()); // Кол-во элемнтов
            //Console.WriteLine(intsStack.Push()); // Кладет значение в стек




            //Queue<string> queue = new Queue<string>(); //Очереди

            //queue.Enqueue("a"); //Добавить значение в очередь,добавление элементов: как стек только наоборот
            //queue.Enqueue("b");
            //queue.Enqueue("c");
            //queue.Enqueue("d");
            //queue.Enqueue("e");

            //Console.WriteLine(queue.Count);
            //Console.WriteLine(queue.Dequeue()); // Убрать значение с конца



            //Cловарь

            //SomeClass[] someClass = new SomeClass[]
            //{
            //    new SomeClass(10),
            //     new SomeClass(20),
            //      new SomeClass(30),
            //       new SomeClass(40),
            //};

            //foreach (var t in someClass)
            //{
            //    Console.WriteLine(t.Number);
            //}




            //Dictionary<string, string> newDict = new Dictionary<string, string>();

            //newDict["first"] = "one";
            //newDict["second"] = "two";
            //newDict["third"] = "three";

            //bool IsKeyexists = newDict.ContainsKey("first"); // Проверка содержания ключа
            //bool IsValueExists = newDict.ContainsValue("one"); // Проверка содержания значения

            //Console.WriteLine(IsKeyexists);
            //Console.WriteLine(IsValueExists);

            //foreach (var item in newDict)
            //{
            //    Console.WriteLine($"{item.Key} : {item.Value}");
            //}


            //Множества (хранит уникальные значения)

            HashSet<int> newHash = new HashSet<int>(); //SortedSet<> - Как Hash еще и сортировка 

            for (int i = 0; i < 10; i++)
            {
                int numb = random.Next(1, 5);
                newHash.Add(numb);
                Console.Write(numb);
            }

            //newHash.Add(1);
            //newHash.Add(2);
            //newHash.Add(2);
            //newHash.Add(4);
            //newHash.Add(5);
            //newHash.Add(5);
            //newHash.Add(7);
            //newHash.Add(8);


            //newHash.Remove(8);

            foreach (int i in newHash)
            {
                Console.WriteLine(i);
            }
        }

        //class SomeClass
        //{
        //    public SomeClass(int value)
        //    {
        //        Number = value;
        //    }
        //    public int Number { get; set; }
        //}

    }
}


