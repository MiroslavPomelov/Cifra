using Microsoft.EntityFrameworkCore;
using mvc.Database.Entities;

namespace mvc.Database.Contexts
{
    public class SqLiteDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }

        public SqLiteDbContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("DataSource=books.sqlite");
        }

       
    }
}
