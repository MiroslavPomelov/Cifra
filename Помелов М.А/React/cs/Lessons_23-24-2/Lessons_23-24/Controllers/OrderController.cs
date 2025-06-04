using Microsoft.AspNetCore.Mvc;

namespace Lessons_23_24.Controllers
{
    [Route("orders")]
    public class OrderController : Controller
    {
        [Route("all")]
        public IActionResult AllOrders()
        {
            return Content("aaa");
            //return View("List");
        }

        [Route("{id}")] 
        public IActionResult OrderDetails(int id)
        {
            return Content($"Priduct ID: {id}");
            //return View("Details");
        }
    }
}
