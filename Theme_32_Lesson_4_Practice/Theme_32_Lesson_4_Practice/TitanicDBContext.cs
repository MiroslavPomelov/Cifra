using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_32_Lesson_4_Practice
{
    public class TitanicDBContext : DbContext
    {
        public DbSet<Titanic> Titanics => Set<Titanic>();

        public TitanicDBContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=TitanicPassengers.db");
        }
    }
}
