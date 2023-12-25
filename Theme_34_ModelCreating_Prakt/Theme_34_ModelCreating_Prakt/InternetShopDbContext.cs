using Microsoft.EntityFrameworkCore;
using Theme_34_ModelCreating_Prakt.Entities;

namespace Theme_34_ModelCreating_Prakt
{
    public class InternetShopDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;


        public InternetShopDbContext()
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
