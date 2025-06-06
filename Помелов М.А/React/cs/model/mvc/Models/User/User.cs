using System.ComponentModel.DataAnnotations;

namespace mvc.Models.User
{
    public class User
    {
        [Required(ErrorMessage = "Name is required for input!")]
        public string Name { get; set; }
        [EmailAddress(ErrorMessage = "Email is not correct!")]
        public string Email { get; set; }
        [RegularExpression(@"^/+?\d{10,12}$",ErrorMessage = "Phone is not correct!")]
        public string Phone { get; set; }
    }
}
