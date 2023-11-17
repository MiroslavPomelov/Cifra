using OfficeOpenXml;
namespace newExcel17._11._23
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ExcelPackage newBook = new ExcelPackage("Inventar.xlsx");
            ExcelWorksheet currentSheet = newBook.Workbook.Worksheets["Inventary"];

            currentSheet.Columns.Width = 20;

            List<Goods> goods = new List<Goods>()
            {
                new Goods("Арбзуз",123123,"Большой",250, 12, 5000, new DateTime(2023, 10, 12), "ООО Фруктс","Калиниград"),
                new Goods("Яблоко",123111,"Сладкий",50, 12, 5000, new DateTime(2023, 10, 12), "ООО Фруктс","Калиниград"),
                new Goods("Банан",123122,"Желтый",70, 12, 5000, new DateTime(2023, 10, 12), "ООО Фруктс","Калиниград"),
                new Goods("Апельсин",123133,"Оранжевый",80, 12, 5000, new DateTime(2023, 10, 12), "ООО Фруктс","Калиниград"),
                new Goods("Груша",123144,"Светлая",45, 12, 5000, new DateTime(2023, 10, 12), "ООО Фруктс","Калиниград"),
            };

            int row = 1;
            foreach (Goods item in goods)
            {
                currentSheet.Cells[row, 1].Value = item.GoodName;
                currentSheet.Cells[row, 2].Value = item.Code;
                currentSheet.Cells[row, 3].Value = item.Description;
                currentSheet.Cells[row, 4].Value = item.Price;
                currentSheet.Cells[row, 5].Value = item.Quantity;
                currentSheet.Cells[row, 6].Value = string.Empty;
                currentSheet.Cells[row, 7].Value = item.DateCome;
                currentSheet.Cells[row, 8].Value = item.Distributor;
                currentSheet.Cells[row, 9].Value = item.Location;
                row++;
            }

            int i = 6;
            foreach (Goods item in goods)
            {
                currentSheet.Cells[row, i].Formula = $"PRODUCT(A4:A5)";
                i++;
            }


            ////Заполнение данных
            //currentSheet.Cells["A1"].Value = 30;
            //currentSheet.Cells["A2"].Value = 45;
            //currentSheet.Cells["A3"].Value = 70;

            ////Заполнение данных
            //currentSheet.Cells["B1"].Value = 10;
            //currentSheet.Cells["B2"].Value = 25;
            //currentSheet.Cells["B3"].Value = 30;

            ////Формула подсчета cуммы по ячейкaм
            //currentSheet.Cells["C1"].Formula = "SUM(A1:B1)";
            //currentSheet.Cells["C2"].Formula = "SUM(A2:B2)";
            //currentSheet.Cells["C3"].Formula = "SUM(A3:B3)";

            ////Формула подсчета среднего арифметичского по ячейкaм
            //currentSheet.Cells["A5"].Formula = "AVERAGE(A1:C3)";

            ////Формула подсчета cчетчика цифра по ячейкaм
            //currentSheet.Cells["B5"].Formula = "COUNT(A1:C3)";

            ////Формула подсчета максимального/минимального значения по ячейкaм
            //currentSheet.Cells["A4"].Formula = "MAX(A1:A3)";
            //currentSheet.Cells["B4"].Formula = "MAX(B1:B3)";

            ////Поиск значения в таблице
            //Random random = new Random();
            //currentSheet.Columns.Width = 50;

            //for (int i = 0; i < 10; i++)
            //{
            //    for (int j = 0; j < 5; j++)
            //    {
            //        currentSheet.Cells[i + 1, j + 1].Value = $"Значение {random.Next(50)}";
            //    }
            //}

            //currentSheet.Cells["F1"].Formula = "VLOOKUP(F2, A1:E5, 2, FALSE)"; // куда записываем, какой диапазон поиск, по какому столбцу ищем соответствие.


            newBook.Save();
        }

    }
    public class Goods
    {
        public string GoodName { get; set; }
        public int Code { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal GeneralPrice { get; set; }
        public DateTime DateCome { get; set; }
        public string Distributor { get; set; }
        public string Location { get; set; }

        public Goods(string goodName, int code, string description, decimal price, int quantity, decimal generalPrice, DateTime dateCome, string distributor, string location)
        {
            GoodName = goodName;
            Code = code;
            Description = description;
            Price = price;
            Quantity = quantity;
            GeneralPrice = generalPrice;
            DateCome = dateCome;
            Distributor = distributor;
            Location = location;
        }
    }
}