

namespace Praktik19._01._2024
{
    public static class User 
    {
        public static string? Name { get; set; }
        public static decimal Money { get; set; }
        public static int Age { get; set; }

        //public static User(string? name, decimal money)
        //{
        //    Name = name;
        //    Money = money;
        //}

        public static void newUser(string name, decimal money, int userAge)
        {
            Money = money;
            Name = name;
            Age = userAge;
        }
    }
}
