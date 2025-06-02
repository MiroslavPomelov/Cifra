using Auth02_06.Authorization.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Auth02_06
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSingleton<IAuthorizationHandler, DocumentAuthorizationHandler>();

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
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("over18", policy =>
                {
                    policy.RequireAssertion(context =>
                    {
                        Claim? ageClaim = context.User.FindFirst("Age");

                        if (ageClaim is not null && int.TryParse(ageClaim.Value, out int age))
                        {
                            return age >= 18;
                        }

                        return false;

                    });
                });
            });
            builder.Services.AddControllers();

            WebApplication app = builder.Build();
            app.MapControllers();
            app.UseAuthentication();
            app.UseAuthorization();


            // #1 Role-based
            app.MapGet("/admin", [Authorize(Roles = "admin")] () => "Hello Admin!").RequireAuthorization();
            app.MapGet("/user", [Authorize(Roles = "user")] () => "Hello User!").RequireAuthorization();

            // #2 Policy
            app.MapGet("/restricted", [Authorize(Policy = "over18")] () => "Hello User!").RequireAuthorization();

            // #3 Resource-base-Auth



            app.MapGet("/secure", [Authorize]() => "Hello from Secure route!");
            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}
