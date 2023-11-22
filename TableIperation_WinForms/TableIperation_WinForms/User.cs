namespace TableIperation_WinForms
{
    public class User
    {
        public string Name { get; set; }
        public string SurName { get; set; }
        public int Age { get; set; }

        public User(string name, string surName, int age)
        {
            Name = name;
            SurName = surName;
            Age = age;
        }
    }
}
