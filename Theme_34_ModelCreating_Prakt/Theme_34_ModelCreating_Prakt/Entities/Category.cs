using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Theme_34_ModelCreating_Prakt.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR(25)")]
        public string Name { get; set; }
        public string Description { get; set; }

        public Category() { }

        public Category(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
