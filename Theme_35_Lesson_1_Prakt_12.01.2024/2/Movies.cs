using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper.Configuration.Attributes;

namespace _2
{
    public class Movies
    {
        [Name("Id")]
        public int Id { get; set; }
        [Name("Name")]
        public string Name { get; set; }
        [Name("Year")]
        public int Year { get; set; }
        [Name("Director")]
        public string Director { get; set; }
        [Name("Genre")]
        public string Genre { get; set; }
        [Name("Graduate")]
        public double Graduate { get; set; }
    }
}
