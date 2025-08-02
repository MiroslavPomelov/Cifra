using Microsoft.EntityFrameworkCore;
using order_service.Models;

namespace order_service.Data
{
    public class OrderDbContext : DbContext
    {
        public OrderDbContext(DbContextOptions<OrderDbContext> options) : base(options) { }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Настройка отношений
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
                
            // Индексы для оптимизации запросов
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.UserId);
                
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.ShopId);
                
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.Status);
                
            modelBuilder.Entity<Order>()
                .HasIndex(o => o.CreatedAt);
        }
    }
} 