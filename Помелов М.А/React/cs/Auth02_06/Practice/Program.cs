using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Practice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "practice-app",
                    ValidAudience = "practice-app-books",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super_secret_key_12345213123123122323232323223233123123213123"))
                };
            });
            builder.Services.AddControllers();

            WebApplication app = builder.Build();

            app.MapControllers();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapGet("/secure", [Authorize] () => "Hello from Secure route!");

            app.MapGet("/guest", [Authorize(Roles = "guest")] () => "Hello guest!").RequireAuthorization();
            app.MapGet("/reader", [Authorize(Roles = "reader")] () => "Hello reader!").RequireAuthorization();
            app.MapGet("/librarian", [Authorize(Roles = "librarian")] () => "Hello librarian!").RequireAuthorization();


            app.Run();
        }
    }
}
