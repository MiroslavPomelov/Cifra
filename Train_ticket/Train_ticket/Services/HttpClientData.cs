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
using Train_ticket.Services.WEBServices;
using Newtonsoft.Json.Linq;
using Train_ticket.View;

namespace Train_ticket.Services
{
    internal class HttpClientData
    {
        public static async Task SendDataAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.0.240:8080/reg", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    responseContent = JsonSerializer.Deserialize<string>(responseContent);

                    if (responseContent == "welldone")
                    {
                        MessageBox.Show("Вы зарегестрированы!");

                        var windows = Application.Current.Windows.OfType<StartWindow>();
                        foreach (var window in windows)
                        {
                            window.Hide();
                        }
                        AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                        authorizationWindow.Show();
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
                TokenStorage.TokenStorageKey = null;
                EncryptionHelper.encryptionKey = null;
                string token = null;
                string clientKey = null;

                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.0.240:8080/auth", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    token = response.Headers.GetValues("AcceptEncoding").FirstOrDefault();
                    EncryptionHelper.encryptionKey = EncryptionHelper.Decrypt(response.Headers.GetValues("Authorization").FirstOrDefault(), EncryptionHelper.primaryKey);

                    clientKey = EncryptionHelper.encryptionKey;

                    User current = JsonSerializer.Deserialize<User>(responseContent);
                    User decryptCurrent = new User(EncryptionHelper.Decrypt(current.Name, clientKey), EncryptionHelper.Decrypt(current.Surname, clientKey), current.Age, EncryptionHelper.Decrypt(current.Login, clientKey), EncryptionHelper.Decrypt(current.Email, clientKey), EncryptionHelper.Decrypt(current.Password, clientKey));
                    //EncryptionHelper.encryptionKey = response.Headers.ToString();

                    if (decryptCurrent.Name != null)
                    {
                        MessageBox.Show($"Добро пожаловать {decryptCurrent.Name}!");
                        TokenStorage.TokenStorageKey = token;
                        return decryptCurrent;
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

        public static async Task<string> SendDataUserTicketAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", TokenStorage.TokenStorageKey);

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.0.240:8080/history", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
                    List<AvaliableSeat> avSeats = JsonSerializer.Deserialize<List<AvaliableSeat>>(responseContent);
                }
                else
                {
                    // Обработка неудачного ответа
                    MessageBox.Show("Ошибка при выполнении запроса: " + response.StatusCode);
                }
                return await response.Content.ReadAsStringAsync();
            }
        }

        public static async Task<string> SendDataUserRootTicketAsync(string jsonData)
        {
            using (HttpClient client = new HttpClient())
            {

                //jsonData = JsonConvert.SerializeObject(jsonData);
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", TokenStorage.TokenStorageKey);

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.0.240:8080/route", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    List<AvaliableSeat> avSeats = new List<AvaliableSeat>();

                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();
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

                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Add("AcceptEncoding", TokenStorage.TokenStorageKey);

                // Отправка POST-запроса
                HttpResponseMessage response = await client.PostAsync("http://192.168.0.240:8080/booking", content);

                // Проверка успешности запроса
                if (response.IsSuccessStatusCode)
                {
                    // Обработка успешного ответа
                    string responseContent = await response.Content.ReadAsStringAsync();

                    //List<AvaliableSeat> avaliableSeats = JsonSerializer.Deserialize<List<AvaliableSeat>>(responseContent);

                    responseContent = JsonSerializer.Deserialize<string>(responseContent);

                    if (responseContent == "welldone")
                    {
                        MessageBox.Show("Бронирование прошло успешно!");

                        //User_Personal authorizationWindow = new User_Personal();
                        //authorizationWindow.Show();

                        //var windows = Application.Current.Windows.OfType<RouteView>();
                        //foreach (var window in windows)
                        //{
                        //    window.Close();
                        //}
                    }
                    else if (responseContent == "tokinisempty" || responseContent == "tokinisNotvalid")
                    {
                        AuthorizationWindow authorizationWindow = new AuthorizationWindow();
                        authorizationWindow.Show();

                        var windows = Application.Current.Windows.OfType<RouteView>();
                        foreach (var window in windows)
                        {
                            window.Close();
                        }
                    }
                    else
                    {
                        MessageBox.Show("Не удалось забронировать. Попробуйте еще раз");

                        User_Personal authorizationWindow = new User_Personal();
                        authorizationWindow.Show();

                        var windows = Application.Current.Windows.OfType<RouteView>();
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

        public async Task<TEntity> GETDataAsync<TEntity>(string jsonData, string domain)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync($"http://192.168.0.240:8080/{domain}", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseContent = await response.Content.ReadAsStringAsync();

                    TEntity deserializedEntity = JsonSerializer.Deserialize<TEntity>(responseContent);
                    return deserializedEntity;
                }
                else
                {
                    MessageBox.Show("Ошибка" + response.StatusCode);
                    return default(TEntity);
                }
            }
        }
    }
}
