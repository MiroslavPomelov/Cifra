using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace _20._10._2023Redaction
{
    public class UserAuthentication
    {
        public bool Authenticate { get; set; }
        public void AuthenticateUser(string username, string password)
        {
            string filePath = Directory.GetCurrentDirectory() + "\\UserData.json";
            string[] userData = File.ReadAllLines(filePath);
            using (StreamReader reader = new StreamReader(filePath))
            {
                for (int i = 0; i < userData.Length; i++)
                {
                    if (userData[i] == username || userData[i] == password)
                    {
                        Authenticate = true;
                    }
                }
            }
        }

        public bool IsUserAuthenticated()
        {
            if (Authenticate)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
