

namespace Theme_35_Lesson_3_LINQEntites
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public TelephoneNumber Number { get; set; }

        public User()
        {
        }

        public User(string? name, int age, TelephoneNumber number)
        {
            Name = name;
            Age = age;
            Number = number;
        }

    }
}
