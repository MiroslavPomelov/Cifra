

namespace PraktikV2
{
    public class Holiday
    {
        public string? Name { get; set; }
        public DateTime Date { get; set; }

        public Holiday(string? name, DateTime date)
        {
            Name = name;
            Date = date;
        }
    }
}
