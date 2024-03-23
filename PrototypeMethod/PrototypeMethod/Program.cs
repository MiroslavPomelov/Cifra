namespace PrototypeMethod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Document word = new Word { Name = "Word", Types = "WordMic", Text = "Times New Roman" };
            Document excel = new Excel { Name = "Word", Types = "WordMic", Sheets = 3 };

            Document wordCreate = word.Create();
            Document excelCreate = excel.Create();
        }
    }

    public abstract class Document
    {
        public string Name { get; set; }
        public abstract string Types { get; set; }
        public abstract Document Create();
    }

    public class Word : Document
    {
        public string Text { get; set; }
        public override string Types { get; set; }

        public override Document Create()
        {
            return new Word()
            {
                Name = this.Name,
                Types = this.Types,
                Text = this.Text
            };
        }
    }

    public class Excel : Document
    {
        public int Sheets { get; set; }
        public override string Types { get; set; }

        public override Document Create()
        {
            return new Excel()
            {
                Name = this.Name,
                Types = this.Types,
                Sheets = this.Sheets
            };
        }
    }
}