using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_34_Lesson_1_ModelCreating
{
    public class UserDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public UserDbContext()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=192.168.10.170;user=cifra-student-remote;password=Cifra39;database=remote_database;", new MySqlServerVersion(new Version(8, 0, 25)));
        }
    }
}
