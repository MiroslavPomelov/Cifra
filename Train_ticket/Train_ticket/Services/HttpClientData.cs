using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Train_ticket.Model.Data.DataBaseEntities;
using System.Linq;
using System.Collections.Generic;
using Train_ticket.AppWindow;

namespace Train_ticket.Services
{
    internal class HttpClientData
    {
        public static async Task SendDataAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                               

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.170:8080/reg", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                   
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

        public static async Task<User> SendDataAuthAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                string token = null;
                // Создание контента для запроса
                //string jsonBody = "{\"Heloo server\":\"I am Bogdan\"}"; // Это типа Json
                //HttpContent content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.170:8080/auth", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    token = response.Headers.GetValues("AcceptEncoding").FirstOrDefault();

                    User current = JsonSerializer.Deserialize<User>(responseContent);

                    if (current.Name != null)
                    {
                        MessageBox.Show("Успешная авторизация!");
                        TokenStorage.AddLogTokenToStorage(current.Login, token);
                        return current;
                    }
                    else
                    {
                        MessageBox.Show("Неправильный логин или пароль");
                        return null;
                    }
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                    return null;
                }
            }
        }


        public static async Task SendDataUserTicketAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                string stroke = null;
                string token = null;

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", token);
                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.170:8080/history", content);
                token = response.Headers.GetValues("AcceptEncoding").FirstOrDefault();

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    List<AvaliableSeat> avSeats = new List<AvaliableSeat>();

                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();

                    try
                    {
                       avSeats = System.Text.Json.JsonSerializer.Deserialize<List<AvaliableSeat>>(responseContent);
                    }
                    catch (Exception ex)
                    { 
                      stroke = System.Text.Json.JsonSerializer.Deserialize<string>(responseContent);
                    }

                    if (stroke == "tokenisempty" || stroke == "tokenisNotvalid")
                    {
                        AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                        authorizationWindow.Show();

                        var windows = Application.Current.Windows.OfType<AuthorizationWindow>();
                        foreach (var window in windows)
                        {
                            window.Close();
                        }
                    }

                    User current = System.Text.Json.JsonSerializer.Deserialize<User>(responseContent);
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
                string stroke = null;
                string token = TokenStorage.CheckLogTokenFromStorage(jsonData);

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", token);

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.170:8080/route", content);
              

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    List<AvaliableSeat> avSeats = new List<AvaliableSeat>();


                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    try
                    {
                        avSeats = System.Text.Json.JsonSerializer.Deserialize<List<AvaliableSeat>>(responseContent);
                    }
                    catch (Exception ex)
                    {
                        stroke = System.Text.Json.JsonSerializer.Deserialize<string>(responseContent);
                    }
                    
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
                string token = null;
                string stroke = null;

                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", token);

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.10.170:8080/booking", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                   
                    stroke = System.Text.Json.JsonSerializer.Deserialize<string>(responseContent);
                    

                    if (stroke == "tokenisempty" || stroke == "tokenisNotvalid")
                    {
                        AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                        authorizationWindow.Show();

                        var windows = Application.Current.Windows.OfType<AuthorizationWindow>();
                        foreach (var window in windows)
                        {
                            window.Close();
                        }
                    }
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
