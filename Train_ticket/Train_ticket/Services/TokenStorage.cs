using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Services
{
    public static class TokenStorage
    {
        //public static Dictionary<string, string> KeyValuePairs { get; set; } = new Dictionary<string, string>();
        public static string TokenStorageKey { get; set; }

        //public static void AddLogTokenToStorage(string login, string token)
        //{
        //    if (login != null && token != null)
        //    {
        //        KeyValuePairs.Add(login, token);
        //    }
        //}

        //public static string CheckLogTokenFromStorage(string login)
        //{
        //    if (login != null)
        //    {
        //        foreach (var item in KeyValuePairs)
        //        {
        //            if (item.Key == login)
        //            {
        //                return item.Value;
        //            }
        //        }
        //    }
        //    return "Ошибка";
        //}
    }
}
