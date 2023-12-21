using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_32_Lesson_4_Practice
{
    public static class DataBaseWorker
    {
        public static List<Passenger> Read()
        {
            List<Passenger> titanicList = new List<Passenger>();

            using (TitanicDBContext dBContext = new TitanicDBContext())
            {
                titanicList = dBContext.Passengers.ToList();
                //foreach (var person in titanicList)
                //{
                //    titanicList.Add(person);
                //}
                
            }
            return titanicList;
        }
    }
}
