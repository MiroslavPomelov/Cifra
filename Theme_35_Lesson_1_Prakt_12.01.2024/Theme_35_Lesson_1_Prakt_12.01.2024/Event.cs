using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Theme_35_Lesson_1_Prakt_12._01._2024
{
   public enum Priority
    {
        High, Low, Medium
    }
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public Priority Priority { get; set; }

        //public Event(int id, string name, DateTime date, Priority priority)
        //{
        //    Id = id;
        //    Name = name;
        //    Date = date;
        //    Priority = priority;
        //}
    }
}
