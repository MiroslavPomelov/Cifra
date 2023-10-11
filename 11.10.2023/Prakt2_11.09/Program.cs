namespace Prakt2_11._09
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Catalog<Book> books = new Catalog<Book>();

            books.AddBook(new Book(1, "Война и мир", "Л.Н.Толстой", new DateTime(1869, 1, 1)));
            books.AddBook(new Book(2, "1984", "Джордж Оруэлл", new DateTime(1949, 1, 1)));
            books.AddBook(new Book(3, "Гарри Поттер 1", "Джоан Роулинг", new DateTime(1997, 1, 1)));

            foreach (Book book in books.GetBooks().Values)
            {
                Console.WriteLine($"Название: {book.Title}\nАвтор: {book.Author}\nГод публикации: {book.PublicationYear}\n");
            }
        }
    }

    class Book : ICatologItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublicationYear { get; set; }

        public Book(int id, string title, string author, DateTime publicationYear)
        {
            Id = id;
            Title = title;
            Author = author;
            PublicationYear = publicationYear;
        }
    }

    interface ICatologItem
    {
        int Id { get; set; }
    }

    class Catalog<T> where T : ICatologItem
    {
        public Dictionary<int, T> Books { get; set; } = new Dictionary<int, T>();

        public void AddBook(T book)
        {
            Books.Add(book.Id, book);
        }

        public Dictionary<int, T> GetBooks()
        {
            return Books;
        }

        public T GetConcreteBook(int id)
        {
            return Books[id];
        }
    }


}