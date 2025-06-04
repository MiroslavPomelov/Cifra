namespace Lessons_23_24
{
    public class Program
    {
        //private static void BuildEndpoints(WebApplication initial)
        //{
        //    initial.MapControllerRoute(
        //        name: "default",
        //        pattern: "{controller=Home}/{action=Index}/{id?}");
        //    initial.MapControllerRoute(
        //            name: "customRoute",
        //            pattern: "shop/{category}/{id?}",
        //            defaults: new { controller = "Product", action = "List" }
        //        );
        //}

        private static void BuildEndpoints(WebApplication initial)
        {
            initial.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            initial.MapControllerRoute(
                    name: "customRoute",
                    pattern: "shop/{category}/{id?}",
                    defaults: new { controller = "Product", action = "List" }
                );
        }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");                
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            BuildEndpoints(app); // Âûםוס ג מעהוכüםûי לועמה ÂÛØÅ

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllerRoute(
            //        name: "customRoute",
            //        pattern: "shop/{category}/{id?}",
            //        defaults: new {controller = "Product", action = "List"}
            //    );
            //}); // shop/electronics/10

            app.Run();
        }
    }
}
