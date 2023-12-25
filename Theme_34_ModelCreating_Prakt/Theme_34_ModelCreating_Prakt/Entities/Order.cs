

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum Status
{
    Ok,
    Failed
}

namespace Theme_34_ModelCreating_Prakt.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "DATE")]
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public User? User { get; set; }
        public List<Product>? Products { get; set; }

        public Order() { }

        public Order(DateTime date, Status status, User user, List<Product> products)
        {
            Date = date;
            Status = status;
            User = user;
            Products = products;
        }

    }
}
