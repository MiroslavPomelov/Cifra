using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Train_ticket.Services.WEBServices.RequestCommands.BaseRequestCommand;

namespace Train_ticket.Services.WEBServices.RequestCommands
{
    internal class PostUserDataRegisterCommand : IRequestCommand
    {
        public async Task<string> Request(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpContent httpContent = new StringContent(jsonData, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync("http://192.168.10.10:8080/reg", httpContent);

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();
                    return responseContent;
                }
                else
                {
                    MessageBox.Show("error");
                    return string.Empty;
                }
            }
        }

    }
}
