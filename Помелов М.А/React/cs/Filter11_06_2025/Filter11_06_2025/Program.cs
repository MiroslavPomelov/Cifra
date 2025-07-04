using Filter11_06_2025.Filters;

namespace Filter11_06_2025
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
           

            // Add services to the container.
            builder.Services.AddSingleton<LogActionFilter>();

            builder.Services.AddControllersWithViews();
            ConfigureServices(builder.Services);

            var app = builder.Build();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }

        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(new MyActionFilter());
            });
        }
    }
}
