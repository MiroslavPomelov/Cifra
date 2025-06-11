using Filter11_06_2025.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Filter11_06_2025.Controllers
{
    [ServiceFilter(typeof(MyResourceFilter))]
    public class MyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [TypeFilter(typeof(MyActionFilter))]
        [TypeFilter(typeof (MyExceptionFilter))]
        public IActionResult MyAction()
        {
            return View();
        }
    }
}
