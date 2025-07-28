using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace payment_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

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