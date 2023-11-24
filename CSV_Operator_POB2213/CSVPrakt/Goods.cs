using CsvHelper.Configuration.Attributes;

namespace CSVPrakt
{

    public class Goods : IComparable<Goods>
    {
        [Name("Name")]
        public string? Name { get; set; }
        [Name("Quantity")]
        public int Quantity { get; set; }
        [Name("Price")]
        public int Price { get; set; }
        [Name("Description")]
        public string? Description { get; set; }
        public int CompareTo(Goods goods)
        {
            return this.Price.CompareTo(goods.Price);
        }
    }
}
