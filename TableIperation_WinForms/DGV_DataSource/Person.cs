using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DGV_DataSource
{
    public class Person
    {
        [DisplayName("Имя пользователя")]
        public string Name { get; set; }
        [DisplayName("Возраст")]
        public int Age { get; set; }
        [DisplayName("Рост")]
        public double Height { get; set; }
        [DisplayName("Вес")]
        public double Weight { get; set; }

        public Person(string name, int age, double height, double weight)
        {
            Name = name;
            Age = age;
            Height = height;
            Weight = weight;
        }
    }
}
