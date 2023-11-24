using CsvHelper.Configuration.Attributes;

namespace CSVPrakt
{

    public class Goods : IComparable<Goods>
    {

        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public string? Description { get; set; }
        public int CompareTo(Goods goods)
        {
           return this.Price.CompareTo(goods.Price);
        }
    }
}
