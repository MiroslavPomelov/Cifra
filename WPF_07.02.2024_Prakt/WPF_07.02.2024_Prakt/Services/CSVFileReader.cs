using CsvHelper.Configuration;
using CsvHelper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPF_07._02._2024_Prakt.Model;

namespace WPF_07._02._2024_Prakt.Services
{
    public class CSVFileReader
    {
        public static List<TitanicPassanger> CSVFileReadering()
        {

            StreamReader reader = new StreamReader("titanic.csv");

            CsvReader csvReader = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture));

            List<TitanicPassanger> people = csvReader.GetRecords<TitanicPassanger>().ToList();
            reader.Close();

            return people;
        }
    }
}
