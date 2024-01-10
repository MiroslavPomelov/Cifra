
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Theme_34_Lesson_5_EntityFields_Properties
{
    [Table("Students_data")] // Название таблицы
    [PrimaryKey(nameof(Name), nameof(Surame))] // Составной ключ pomelo 7.00 +
    public class Student
    {
        // FIRST

        //private int _id;
        //[Column(TypeName ="VARCHAR(25)")]
        //private string? _name;
        //private int _age;
        //[Column(TypeName = "VARCHAR(25)")]
        //private string? _group;

        //public int Id => _id;
        //public int Age => _age;

        //public Student(string name, int age, string group)
        //{
        //    _age = age;
        //    _group = group;
        //    _name = name;
        //}





       /* [Required] */// Обязательное поле
        public string? Name { get; set; }
        public int Id { get; set; }
        public int Age { get; set; }
        public string? Surame { get; set; }


        public Student(string name, int age, string? surame)
        {
            Name = name;
            Age = age;
            Surame = surame;
        }

    }
}
