using Microsoft.AspNetCore.Mvc;

namespace Lessons_23_24.Controllers
{
    public class CustomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details(int id)
        {
            ViewData["Id"] = id;
            ViewData["SomeData"] = "Какие то данные из метода";

            return View();
        }
    }
}
