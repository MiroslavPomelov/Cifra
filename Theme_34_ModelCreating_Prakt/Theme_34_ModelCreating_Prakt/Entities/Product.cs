

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Theme_34_ModelCreating_Prakt.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR(40)")]
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Column(TypeName = "FLOAT")]
        public double Price { get; set; }
        public Category? Category { get; set; }

        public Product() { }

        public Product(string name, string description, double price, Category category)
        {
            Name = name;
            Description = description;
            Price = price;
            Category = category;
        }

    }
}
