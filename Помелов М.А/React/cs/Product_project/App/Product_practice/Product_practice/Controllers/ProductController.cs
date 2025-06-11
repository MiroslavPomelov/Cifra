using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Product_practice.Database.Context;
using Product_practice.Database.Entities;
using System.Text.Json;

namespace Product_practice.Controllers
{


    [Route("products")]
    public class ProductController : Controller
    {
        private readonly MariaDbContext _context;

        public ProductController(MariaDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> CreateProduct()
        {
            var query = HttpContext.Request.Query;
            StringValues quantity = query["quantity"];

            if (StringValues.IsNullOrEmpty(quantity))
            {
                return BadRequest("Parameter \"quantity\" is required");
            }

            int parsedQuantity = int.Parse(query["quantity"]!);

            List<Product> products = new List<Product>();

            for (int i = 0; i < parsedQuantity; i++)
            {
                products.Add(new Product()
                {
                    Name = Faker.Company.Name(),
                    Price = Faker.RandomNumber.Next(1000, 50000),
                    Category = Faker.Company.Name(),
                    CreatedDate = DateTime.Now
                });
            }

            _context.AddRange(products);
            _context.SaveChanges();

            return Json(products);
        }


    }
}
