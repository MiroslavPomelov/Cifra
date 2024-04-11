using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Train_ticket.Services
{
    internal class HttpClientData
    {
        public static async Task SendDataAsync(string name)
        {
           
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");


                HttpContent content = new StringContent(name, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.1.66:8080", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Ответ от сервера: " + responseContent);
                    
                }
                else
                {
                    // Обработка неудачного ответа
                    Console.WriteLine("Ошибка при выполнении запроса: " + response.StatusCode);
                }
            }
           
        }
    }
}
