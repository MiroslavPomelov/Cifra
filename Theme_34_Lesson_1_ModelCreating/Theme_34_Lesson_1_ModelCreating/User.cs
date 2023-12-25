using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_34_Lesson_1_ModelCreating
{
    public class User
    {
        //[Key] - превичный ключ
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)] - Автоинкремент
        //[Column("User_Id")] - Название колонки
        public int Id { get; set; }
        //[Column(TypeName = "VARCHAR(50)")] - Тип данных
        public string Name { get; set; }
        //[Required] not null
        //[ForeignKey("Number_Id")]- внешний ключ
        public int Age { get; set; }

        public User(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }
}
