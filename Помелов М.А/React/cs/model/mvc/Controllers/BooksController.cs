using Microsoft.AspNetCore.Mvc;
using mvc.Database.Contexts;
using mvc.Models;

namespace mvc.Controllers
{

    public class BooksController : Controller
    {
        //private List<Book> _books;

        //public BooksController()
        //{
        //    _books = new List<Book>() {
        //        new Book {Id=1, Title = "Book 1", Author="Author 1", Pages=200, PublishedDate=DateTime.Now},
        //        new Book {Id=2, Title = "Book 2", Author="Author 2", Pages=150, PublishedDate=DateTime.Now},
        //    };
        //}

        public IActionResult Index()
        {

            using (SqLiteDbContext context = new SqLiteDbContext())
            {
                List<Database.Entities.Book> list = context.Books.ToList();
                List<Book> books = new List<Book>();

                for (int i = 0; i < list.Count; i++)
                {
                    Models.Book book = new Models.Book
                    {
                        Title = list[i].Title,
                        Author = list[i].Author,
                        Pages = list[i].Pages,
                        PublishedDate = list[i].PublishedDate,
                    };
                    books.Add(book);
                }

                return View(books);

            }

        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Book book)
        {
            if (ModelState.IsValid) // Состояние модели корректное
            {
                using (SqLiteDbContext context = new SqLiteDbContext())
                {
                    Database.Entities.Book entity = new Database.Entities.Book();
                    entity.Title = book.Title;
                    entity.Author = book.Author;
                    entity.Pages = book.Pages;
                    entity.PublishedDate = book.PublishedDate;

                    context.Add(entity);
                    context.SaveChanges();
                }

                return RedirectToAction("Index");
            }

            return View(book);
        }
    }
}
