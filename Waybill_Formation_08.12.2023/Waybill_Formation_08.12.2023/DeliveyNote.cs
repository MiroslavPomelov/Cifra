using CsvHelper.Configuration.Attributes;

namespace Waybill_Formation_08._12._2023
{
    public class DeliveyNote : IComparable<DeliveyNote>
    {
        [Name("Название товара")]
        public string? Name { get; set; }

        [Name("Количество")]
        public int Quantity { get; set; }
        [Name("Стоимость")]
        public decimal Price { get; set; }
        [Name("ФИО поставщика")]
        public string? Name_provider { get; set; }
        [Name("ФИО получателя")]
        public string? Name_buyer { get; set; }
        [Name("Дата поставки")]
        public DateTime Date { get; set; }

        public int CompareTo(DeliveyNote? deliveyNote)
        {
            return this.Date.CompareTo(deliveyNote.Date);
        }
        public DeliveyNote()
        {

        }

        public DeliveyNote(string? name, int quantity, decimal price, string? name_provider, string? name_buyer, DateTime date)
        {
            Name = name;
            Quantity = quantity;
            Price = price;
            Name_provider = name_provider;
            Name_buyer = name_buyer;
            Date = date;
        }

        
    }
}
