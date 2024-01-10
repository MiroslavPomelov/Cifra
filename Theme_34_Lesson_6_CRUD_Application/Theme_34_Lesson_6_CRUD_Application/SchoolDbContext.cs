

using Microsoft.EntityFrameworkCore;

namespace Theme_34_Lesson_6_CRUD_Application
{
    public class SchoolDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public SchoolDbContext()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var ver = new Version(8, 0, 25);
            MySqlServerVersion mySqlServerVer = new MySqlServerVersion(ver);

            optionsBuilder.UseMySql("server=192.168.10.170;database=remote_database;user=cifra-student-remote;password=Cifra39", mySqlServerVer);
        }


    }
}
