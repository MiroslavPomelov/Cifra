using CsvHelper.Configuration.Attributes;

namespace CSV_Operator_POB2213
{
    public class Person
    {
        [Name("Name")] // Атрибуты как в шапке файла
        public string? Name { get; set; }
        [Name("Age")]
        public int Age { get; set; }
    }
}
