using Microsoft.EntityFrameworkCore;

namespace Strategy
{
    public class SQLiteDataContext : DbContext
    {
        public DbSet<User>? Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSqlite("DataSource=UserDataBase.db");
    }
}



