using Microsoft.EntityFrameworkCore;

namespace DataBaseChangingObserver
{
    public class Operator
    {
        // Делегат и событие для уведомления о изменении данных
        public delegate void DataChangedEventHandler(object sender, EventArgs e);
        public event DataChangedEventHandler DataChanged;

        protected virtual void OnDataChanged(EventArgs e)
        {
            DataChanged?.Invoke(this, e);
        }

        public async Task Operate()
        {
            List<User> previous;
            using (MySQLDataContext dbContext = new MySQLDataContext())
            {
                previous = dbContext.Users.ToList();
            }

            Task checking = Check(previous);
            await checking;
        }

        private async Task Check(List<User> previous)
        {
            while (true)
            {
                List<User> current;
                using (MySQLDataContext dbContext = new MySQLDataContext())
                {
                    current = await dbContext.Users.ToListAsync();
                }

                // Сравниваем данные текущего состояния с предыдущим
                if (!ListsAreEqual(previous, current))
                {
                    // Если данные изменились, вызываем событие
                    OnDataChanged(EventArgs.Empty);
                    previous = current; // Обновляем предыдущее состояние
                }

                await Task.Delay(TimeSpan.FromSeconds(5));
            }
        }

        private bool ListsAreEqual(List<User> currentData, List<User> previousData)
        {
            if (currentData.Count != previousData.Count)
            {
                return false;
            }
            else
            {
                for (int i = 0; i < currentData.Count; i++)
                {
                    if (currentData[i].Id != previousData[i].Id || currentData[i].Name != previousData[i].Name || currentData[i].Age != previousData[i].Age)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}
