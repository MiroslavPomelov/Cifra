using Microsoft.EntityFrameworkCore;

namespace Strategy
{
    public class MySQLDataContext : DbContext
    {
        public DbSet<User>? Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var vers = new MySqlServerVersion(new Version(8, 0, 25));
            optionsBuilder.UseMySql("server=192.168.31.227;database=test;user=teacher-cifra;password=000000", vers);
        }
    }
}
