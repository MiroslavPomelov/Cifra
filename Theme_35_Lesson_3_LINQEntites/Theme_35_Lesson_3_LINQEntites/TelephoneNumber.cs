namespace Theme_35_Lesson_3_LINQEntites
{
    public class TelephoneNumber
    {
        public int Id { get; set; }
        public string? Number { get; set; }

        public TelephoneNumber()
        {

        }

        public TelephoneNumber(string? number)
        {
            Number = number;
        }
    }
}