using System.ComponentModel.DataAnnotations;

namespace mvc.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        [Required]
        [StringLength(100)]
        public string Author { get; set; }
        [Range(0, 1000)]
        public int Pages { get; set; }
        [DataType(DataType.Date)]
        public DateTime PublishedDate { get; set; }

    }
}
