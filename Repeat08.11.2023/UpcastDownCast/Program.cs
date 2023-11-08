namespace UpcastDownCast
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ChildClass childClass = new ChildClass()
            {
                Age = 5,
                Id = 1,
                Name = "asdasd",
                Password = "password",
            };

            ////Parentcalss parentcals = new ChildClass(); //Upcast Приведение к родительскому типу Спрятать класс
            //Parentcalss parent = childClass;  

            //ChildClass childClass2 = (ChildClass)parent; //DownCast Приведение к нижестоящему

            IParentCalss parent = childClass;
        }
    }

    //class Parentcalss
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}

    interface IParentCalss
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    class ChildClass : IParentCalss
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Password { get; set; }
    }

}