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
        public DbSet<Passenger> Passengers => Set<Passenger>();

        public TitanicDBContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=TitanicPassengers.db");
        }
    }
}
