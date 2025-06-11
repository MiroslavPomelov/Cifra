
namespace Product_practice.Utils
{
    public class FileLogger
    {

        private readonly string _currentPath = $"{Directory.GetCurrentDirectory()}\\Logs";

        public FileLogger()
        {
            if (!Directory.Exists(_currentPath))
            {
                Directory.CreateDirectory(_currentPath);

            }

            string filePath = $"{_currentPath}\\logs.log";

            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
            }

            _currentPath = filePath;
        }

        public void LogInformation(string message)
        {
            File.AppendAllText(_currentPath, $" [{DateTime.Now}] [INFO] {message}");

        }

        public void LogError(string message)
        {
            File.AppendAllText(_currentPath, $" [{DateTime.Now}] [ERROR] {message}");
        }
    }
}
