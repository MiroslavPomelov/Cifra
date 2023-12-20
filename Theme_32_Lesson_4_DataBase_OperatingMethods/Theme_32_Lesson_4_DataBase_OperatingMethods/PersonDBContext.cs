using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_32_Lesson_4_DataBase_OperatingMethods
{
    public class PersonDBContext : DbContext
    {
        public DbSet<Person> People => Set<Person>();

        public PersonDBContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=MyDataBase.db");
        }


    }
}
