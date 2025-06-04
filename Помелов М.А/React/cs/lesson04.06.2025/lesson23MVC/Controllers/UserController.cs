using lesson23MVC.Models.Classes.UserModel;
using Microsoft.AspNetCore.Mvc;

namespace lesson23MVC.Controllers
{
    public class UserController : Controller
    {
        private readonly User[] _users = new[] {
            new User(1, "Mir", "24", "sadasdasd@mail.ru", "+791231232131"),
            new User(2, "Bog", "25", "asdsaddddd@mail.ru", "+791231232131"),
            new User(3, "Den", "26", "sadaaaaaaaaaasdasd@mail.ru", "+791231232131"),
            new User(4, "ASd", "27", "vvvvvvvvvvv@mail.ru", "+791231232131"),
            new User(5, "asdsa", "28", "aaaaaaaaaaa@mail.ru", "+791231232131"),
        };

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            ViewData["GetAll"] = _users;

            return View();
        }

        public IActionResult GetRandomUser()
        {
            Random random = new Random();
            ViewData["GetAll"] = random.Next(0, _users.Length);

            return View();
        }

        public IActionResult GetUserById(int id)
        {
            Random random = new Random();
            ViewData["GetAll"] = random.Next(0, _users.Length);

            return View();
        }

        private string BuildUserData(params User[] users)
        {
            string stroke = "";

            foreach (var user in users)
            {
                stroke = $"<h4>Имя: {user.Name}</h4><p>Возраст: {user.Age}</p><p>Почта: {user.Email}</p>";
            }

           return stroke;

        }
    }
}
