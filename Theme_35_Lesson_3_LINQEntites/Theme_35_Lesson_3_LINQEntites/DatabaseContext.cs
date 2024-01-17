using Microsoft.EntityFrameworkCore;


namespace Theme_35_Lesson_3_LINQEntites
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<TelephoneNumber> TelephoneNumber { get; set; } = null!;

        public DatabaseContext()
        {
            //Database.EnsureDeleted();
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
