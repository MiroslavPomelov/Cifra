using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using order_service.Data;

namespace order_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Добавляем Entity Framework
            builder.Services.AddDbContext<OrderDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("OrderDB")));

            // Добавляем health checks
            builder.Services.AddHealthChecks();

            // Добавляем контроллеры
            builder.Services.AddControllers();

            var app = builder.Build();

            // Автоматическое создание базы данных
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<OrderDbContext>();
                try
                {
                    context.Database.EnsureCreated();
                    Console.WriteLine("База данных успешно создана или уже существует");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Ошибка при создании базы данных: {ex.Message}");
                }
            }

            // Настраиваем health check endpoint
            app.MapHealthChecks("/health");

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
} 