using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using order_service.Data;
using Microsoft.Extensions.Caching.StackExchangeRedis;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;

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

            // Добавляем Redis кэширование
            builder.Services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = $"{builder.Configuration["Redis:Host"]}:{builder.Configuration["Redis:Port"]}";
                options.InstanceName = "OrderService_";
            });

            // Временно отключаем JWT аутентификацию для отладки
            // var jwtKey = builder.Configuration["Jwt:Key"] ?? "your-256-bit-secret-key-for-jwt-token-generation-and-validation";
            // Console.WriteLine($"JWT Key configured: {jwtKey.Substring(0, Math.Min(10, jwtKey.Length))}...");
            
            // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options =>
            //     {
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuer = false,
            //             ValidateAudience = false,
            //             ValidateLifetime = true,
            //             ValidateIssuerSigningKey = true,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            //         };
            //         
            //         // Конфигурация с OnMessageReceived для извлечения токена
            //         options.Events = new JwtBearerEvents
            //         {
            //             OnAuthenticationFailed = context =>
            //             {
            //                 Console.WriteLine($"JWT Authentication failed: {context.Exception.Message}");
            //                 Console.WriteLine($"JWT Authentication failed - Exception type: {context.Exception.GetType().Name}");
            //             return Task.CompletedTask;
            //         },
            //             OnTokenValidated = context =>
            //             {
            //                 Console.WriteLine($"JWT Token validated successfully for user: {context.Principal?.Identity?.Name}");
            //             return Task.CompletedTask;
            //         },
            //             OnMessageReceived = context =>
            //             {
            //                 var request = context.HttpContext.Request;
            //                 var authHeader = request.Headers["Authorization"].FirstOrDefault();
            //                 
            //                 if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ")
            //                 {
            //                     var token = authHeader.Substring("Bearer ".Length);
            //                     Console.WriteLine($"OnMessageReceived - Setting token: {token.Substring(0, Math.Min(20, token.Length))}...");
            //                     context.Token = token;
            //                 }
            //                 
            //                 return Task.CompletedTask;
            //             }
            //         };
            //     });

            // Добавляем авторизацию
            builder.Services.AddAuthorization();

            // Отключаем ServiceAuthGuard
            // builder.Services.AddScoped<Guards.ServiceAuthGuard>();

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
            
            // Добавляем middleware для извлечения JWT токена
            app.Use(async (context, next) =>
            {
                var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
                {
                    var token = authHeader.Substring("Bearer ".Length);
                    Console.WriteLine($"Custom Middleware - Extracted token: {token.Substring(0, Math.Min(20, token.Length))}...");
                    Console.WriteLine($"Custom Middleware - Token length: {token.Length}");
                    Console.WriteLine($"Custom Middleware - Token contains dots: {token.Contains(".")}");
                }
                await next();
            });
            
            // Временно отключаем стандартную аутентификацию и авторизацию
            // app.UseAuthentication();
            // app.UseAuthorization();
            
            app.MapControllers();

            Console.WriteLine("Order Service started with JWT authentication enabled");
            app.Run();
        }
    }
} 