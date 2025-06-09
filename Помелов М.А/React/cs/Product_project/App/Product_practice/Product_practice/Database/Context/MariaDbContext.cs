using Microsoft.EntityFrameworkCore;
using Product_practice.Database.Entities;

namespace Product_practice.Database.Context
{
    public class MariaDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public MariaDbContext(DbContextOptions options) : base(options)
        {
            Console.WriteLine(Database.CanConnect());
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseMySql("DataSource=products.sqlite", );
        //}
    }
}
