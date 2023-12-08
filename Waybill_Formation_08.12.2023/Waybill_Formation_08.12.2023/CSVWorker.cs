using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;
using CsvHelper.Configuration.Attributes;
using System.Globalization;
using CsvHelper.Configuration;

namespace Waybill_Formation_08._12._2023
{
    public static class CSVWorker
    {
        public static List<DeliveyNote> CSVReader()
        {
            DeliveyNote deliveyNote = new DeliveyNote();
            StreamReader reader = new StreamReader("data.csv");

            CsvConfiguration csvConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture);

            CsvReader csvReader = new CsvReader(reader, csvConfiguration);
            List<DeliveyNote> people = csvReader.GetRecords<DeliveyNote>().ToList();
            List<DeliveyNote> tempList = new List<DeliveyNote>();

            reader.Close();

            foreach (var item in people)
            {
                bool isDataExist = false;
                for (int i = 0; i < tempList.Count; i++)
                {
                    if (tempList[i].Name == item.Name && tempList[i].Name_buyer == item.Name_buyer && tempList[i].Date == item.Date)
                    {
                        tempList[i].Quantity += item.Quantity;
                        isDataExist = true;
                    }
                }

                if (!isDataExist)
                {
                    tempList.Add(item);
                }
            }
            tempList.Sort();

            foreach (var item in tempList)
            {
                Console.WriteLine($"{item.Name}, {item.Quantity}, {item.Price}, {item.Name_provider}, {item.Name_buyer}, {item.Date}");
            }

            return tempList;
            
        }
    }
}



