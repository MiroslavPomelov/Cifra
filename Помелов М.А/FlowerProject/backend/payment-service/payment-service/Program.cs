namespace payment_service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

          
            builder.WebHost.ConfigureKestrel(options => 
            {
                options.ListenAnyIP(3000); 
            });

           
            builder.Services.AddHealthChecks();

           
            builder.Services.AddControllers();

            var app = builder.Build();

          
            app.MapHealthChecks("/health", new HealthCheckOptions
            {
                ResponseWriter = async (context, report) => 
                {
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync("true"); 
                }
            });

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
}