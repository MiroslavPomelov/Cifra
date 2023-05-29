using System.Text;

string path = "text.txt";
string text = "Hello, world";

using (FileStream fstream = new FileStream("text.txt", FileMode.OpenOrCreate))
{
    byte[] buffer = Encoding.Default.GetBytes(text);
    fstream.Write(buffer, 0, buffer.Length);
}

FileInfo fileInfo = new FileInfo(path);

Console.WriteLine("Выберите:\n1 - копировать файл\n2 - переместить файл\n3 - удалить файл");
int choice = int.Parse(Console.ReadLine());

Console.WriteLine();

switch (choice)
{
    case 1:
        Console.Write("Введите полный путь копирования: ");
        string newPath = Console.ReadLine();
        newPath += path;
        fileInfo.CopyTo(newPath, true);
        Console.WriteLine("Ваш файл скопирован");
        break;
    case 2:
        Console.Write("Введите полный путь перемещения: ");
        string movePath = Console.ReadLine();
        movePath+= path;
        fileInfo.MoveTo(movePath);
        Console.WriteLine("Ваш файл перемещен");
        break;
    case 3:
        fileInfo.Delete();
        Console.WriteLine("Вы удалили файл");
        break;
    default:
        Console.WriteLine("Такой команды не существует!");
        break;
}