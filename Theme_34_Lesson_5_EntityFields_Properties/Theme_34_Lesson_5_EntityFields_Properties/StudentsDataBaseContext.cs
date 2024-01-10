
using Microsoft.EntityFrameworkCore;

namespace Theme_34_Lesson_5_EntityFields_Properties
{
    public class StudentsDataBaseContext : DbContext
    {
        public DbSet<Student> Students { get; set; } = null;

        public StudentsDataBaseContext()
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

        protected override void OnModelCreating(ModelBuilder modelBuilder) // При создании модели поля указываем
        {
            modelBuilder.Entity<Student>().Property("Name").IsRequired(false);
            modelBuilder.Entity<Student>().HasKey(u=> new {u.Name, u.Surame}); // Указание составного ключа



            /* modelBuilder.Entity<Student>().Property("Name").IsRequired();*/ // Обязательное поле (2 вариант)


            //modelBuilder.Entity<Student>().Property("Id").HasField("_id"); // Для приватных полей через свойства
            //modelBuilder.Entity<Student>().Property("Age").HasField("_age");
            //modelBuilder.Entity<Student>().Property("_name");
            //modelBuilder.Entity<Student>().Property("_group");
        }
    }
}
