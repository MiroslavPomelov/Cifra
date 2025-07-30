using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using payment_service.Data;

namespace payment_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<PaymentDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PaymentDB")));

            // Добавляем health checks
            builder.Services.AddHealthChecks();

            // Добавляем контроллеры
            builder.Services.AddControllers();

            var app = builder.Build();

            // Настраиваем health check endpoint
            app.MapHealthChecks("/health");

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
}