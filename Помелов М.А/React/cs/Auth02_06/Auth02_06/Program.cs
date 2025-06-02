using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Auth02_06
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

                    ValidIssuer = "example-app",
                    ValidAudience = "example-app-users",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super_secret_key_12345213123123122323232323223233123123213123"))
            };
            });
            builder.Services.AddAuthorization();
            builder.Services.AddControllers();

            WebApplication app = builder.Build();
            app.MapControllers();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapGet("/secure", [Authorize]() => "Hello from Secure route!");
            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}
