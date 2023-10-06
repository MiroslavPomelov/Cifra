namespace _06._10InterfacePlus
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Person firstPerson = new Person("Slava", 24);

            object secondPerson = firstPerson.Clone();

            Person newSecondPerson = (Person)secondPerson; // Копия того, что в конструкторе выше
        }
    }

    //interface Isinger<T> Расширенный интерфейс
    //{
    //    T GetValue();

    //    void SetValue(T value);
    //}

    //class SomeClass: Isinger<int>
    //{
    // public int data;
    // public int GetValue()
    // {
    // return ...
    //}

    //}

    //Интерфейс ICloneable - клонирование типов
    //Clone() - метод, копирует новый объект в куче.

    class Person : ICloneable
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public Person(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public object Clone()
        {
            return new Person(Name, Age);
        }
    }
}