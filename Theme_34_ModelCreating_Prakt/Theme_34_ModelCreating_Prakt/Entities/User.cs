using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Theme_34_ModelCreating_Prakt.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR(25)")]
        public string? Name { get; set; }
        [Column(TypeName = "VARCHAR(25)")]
        public string? Address { get; set; }
        [Column(TypeName = "VARCHAR(25)")]
        public string? Password { get; set; }
        public List<Order>? Orders { get; set; }

        public User() { }

        public User(string name, string address, string password, List<Order> orders)
        {
            Name = name;
            Address = address;
            Password = password;
            Orders = orders;
        }

    }
}
