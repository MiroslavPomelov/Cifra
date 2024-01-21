

namespace Praktik19._01._2024
{
    public class User 
    {
        public string? Name { get; set; }
        public decimal Money { get; set; }
        public decimal TotalSum { get; set; }
        public int Age { get; set; }

        public User(string? name, decimal money, int age)
        {
            Name = name;
            Money = money;
            Age = age;
        }
    }
}
