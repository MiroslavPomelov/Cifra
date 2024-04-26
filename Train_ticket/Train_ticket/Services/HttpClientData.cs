using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Train_ticket.Services
{
    internal class HttpClientData
    {
        public static async Task SendDataAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.196:8080/reg", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Ответ от сервера: " + responseContent);
                    if (responseContent == "welldone")
                    {
                        MessageBox.Show("Вы зарегестрированы!");
                    }
                    else if (responseContent == "loginisexist")
                    {
                        MessageBox.Show("Данный логин уже используется");
                    }
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
            }
        }

        public static async Task SendDataAuthAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.196:8080/auth", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Ответ от сервера: " + responseContent);
                    if (responseContent == "welldone")
                    {
                        MessageBox.Show("Успешная авторизация!");
                    }
                    else if (responseContent == "wrong")
                    {
                        MessageBox.Show("Неправильный логин или пароль");
                    }
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
            }
        }


        public static async Task SendDataUserTicketAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.196:8080/history", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Ответ от сервера: " + responseContent);
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
            }
        }


        public static async Task<string> SendDataUserRootTicketAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.196:8080/route", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Ответ от сервера: " + responseContent);
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
                return await response.Content.ReadAsStringAsync();
            }
        }

        public static async Task SendDataBookingTickethAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.196:8080/booking", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    MessageBox.Show("Ответ от сервера: " + responseContent);
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
            }
        }
    }
}
