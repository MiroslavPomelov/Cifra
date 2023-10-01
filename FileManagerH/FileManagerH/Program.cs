using System.Text;

namespace FileManager_Chyornyy
{
    internal class Program
    {
        public static int WINDOW_WIDTH = 120;
        public static int WINDOW_HEIGTH = 40;
        public const string ROOT_DIRECTORY = "C:\\Users\\C2NB6\\Desktop";
        public static string currentDirectory = "C:\\Users\\C2NB6\\Desktop";
        public static string tree = "";

        static void Main(string[] args)
        {
            Console.SetWindowSize(WINDOW_WIDTH, WINDOW_HEIGTH);
            Console.SetBufferSize(WINDOW_WIDTH, WINDOW_HEIGTH);

            DrawConsole(0, 0, WINDOW_WIDTH, 18);
            DrawConsole(0, 20, WINDOW_WIDTH, 8);

            UpdateConsole();
        }

        public static void UpdateConsole()
        {
            DrawInputCommandField(currentDirectory, 1, 31, WINDOW_WIDTH, 1);
            CommandInputProcess();
        }

        public static void CommandInputProcess()
        {
            StringBuilder command = new StringBuilder();

            char key;
            int left = 0; int top = 0;
            GetCurrentCursorPosition(ref left, ref top);

            do
            {
                int currentLeft = 0; int currentTop = 0;
                GetCurrentCursorPosition(ref currentLeft, ref currentTop);

                key = Console.ReadKey().KeyChar;
                if ((ConsoleKey)key == ConsoleKey.Backspace && Console.CursorLeft < left)
                {
                    Console.Write(">");
                }
                else if ((ConsoleKey)key == ConsoleKey.Backspace)
                {
                    command.Remove(command.Length - 1, 1);
                    Console.Write(" ");
                    Console.SetCursorPosition(currentLeft - 1, currentTop);
                }
                else if (currentLeft == WINDOW_WIDTH - 2)
                {
                    Console.SetCursorPosition(currentLeft, currentTop);
                    Console.Write(" ");
                    Console.SetCursorPosition(currentLeft, currentTop);

                }
                else
                {
                    command.Append(key);
                }
            }
            while ((ConsoleKey)key != ConsoleKey.Enter);
            command.Remove(command.Length - 1, 1);
            CommandParser(command);
        }

        private static void CommandParser(StringBuilder command)
        {
            string[] splittedCommand = command.ToString().Split(" ");

            switch (splittedCommand[0])
            {
                case "cd":
                    ChangeDirectory(command.ToString());
                    break;
                case "tree":
                    DrawTree(int.Parse(splittedCommand[1]), splittedCommand[2]);
                    break;
            }
            UpdateConsole();
        }

        public static void ChangeDirectory(string command)
        {
            string[] splittedCommand = command.ToString().Split(" ");
            if (splittedCommand.Length > 2)
            {
                currentDirectory = ROOT_DIRECTORY;
            }
            else
            {
                if (splittedCommand[1] == "..")
                {
                    string[] splittedDirectory = currentDirectory.Split("\\");
                    currentDirectory = "";
                    //case ".." :
                    for (int i = 0; i < splittedDirectory.Length - 1; i++)
                    {
                        if (i == splittedDirectory.Length - 2)
                        {
                            currentDirectory += splittedDirectory[i];
                        }
                        currentDirectory += splittedDirectory[i] + "\\";
                    }
                }
                else if (splittedCommand[1].Contains("\\") && Directory.Exists(splittedCommand[1]))
                {
                    currentDirectory = splittedCommand[1];
                }
                else if (Directory.Exists(currentDirectory + $"\\{splittedCommand[1]}"))
                {
                    currentDirectory += $"\\{splittedCommand[1]}";
                }
                else
                {
                    DrawConsole(0, 20, WINDOW_WIDTH, 8);
                    Console.SetCursorPosition(1, 21);
                    Console.Write("Папка не существует!");
                }
            }
        }

        public static void GetCurrentCursorPosition(ref int left, ref int top)
        {
            left = Console.CursorLeft; top = Console.CursorTop;
        }

        public static void DrawInputCommandField(string directory, int x, int y, int wigth, int heigth)
        {
            DrawConsole(0, 30, wigth, heigth);
            Console.SetCursorPosition(x, y);
            Console.Write($"{directory}>");
        }

        public static void DrawConsole(int x, int y, int width, int heigth)
        {
            Console.SetCursorPosition(x, y);
            //Вывод шапки
            Console.Write("┌");
            for (int i = 0; i < width - 2; i++)
            {
                Console.Write("─");
            }
            Console.Write("┐");

            //Вывод тела
            for (int i = 0; i < heigth; i++)
            {
                Console.Write("│");
                for (int j = 0; j < width - 2; j++)
                {
                    Console.Write(" ");
                }
                Console.Write("│");
            }

            //Вывод подвала
            Console.Write("└");
            for (int i = 0; i < width - 2; i++)
            {
                Console.Write("─");
            }
            Console.Write("┘");
        }

        public static void GetTree(DirectoryInfo directory, string indent, bool lastDirectory)
        {
            tree += indent;
            if (lastDirectory)
            {
                tree += "└──";
                indent += "   ";
            }
            else
            {
                tree += "├──";
                indent += "│  ";
            }
            tree += directory.Name + "\n";

            try
            {
                DirectoryInfo[] subDirectories = directory.GetDirectories();

                for (int i = 0; i < subDirectories.Length; i++)
                {
                    GetTree(subDirectories[i], indent, i == subDirectories.Length - 1);
                }
            }
            catch (Exception)
            {

            }
        }

        public static void DrawTree(int page, string defaultPath)
        {
            DrawConsole(0, 0, WINDOW_WIDTH, 18);
            GetTree(new DirectoryInfo(defaultPath), "", true);

            string[] line = tree.Split('\n');
            int linesAtPage = 18;
            int pagesQuantity = (int)Math.Ceiling(line.Length / (double)linesAtPage);

            string[,] pages = new string[pagesQuantity, linesAtPage];

            if (line.Length >= linesAtPage)
            {
                for (int i = 0; i < pages.GetLength(0); i++)
                {
                    int counter = 0;
                    for (int j = linesAtPage * i; j < linesAtPage * (i + 1); j++)
                    {
                        if (line[j] == "")
                        {
                            break;
                        }
                        pages[i, counter] = line[j];
                        counter++;
                    }
                }
            }
            else
            {
                for (int i = 0; i < pages.GetLength(0); i++)
                {
                    int counter = 0;
                    for (int j = linesAtPage * i; j < linesAtPage * (i + 1); j++)
                    {
                        pages[i, counter] = line[j];
                        counter++;
                    }
                }
            }

            for (int i = 0; i < pages.GetLength(1); i++)
            {
                Console.SetCursorPosition(1, i + 1);
                Console.WriteLine(pages[page - 1, i]);
            }
            string currentPage = $"Страница: [{page} / {pages.GetLength(0)}]";
            Console.SetCursorPosition(WINDOW_WIDTH / 2 - currentPage.Length / 2, 19);
            Console.WriteLine(currentPage);
            tree = "";
        }


    }
}
