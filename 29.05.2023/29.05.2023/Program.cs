// Файловый мненджер

using System.IO;
using System.Reflection;

//while (true)
//{
//    string path = Environment.CurrentDirectory;
//    Console.Write(path + ">");
//    string? command = Console.ReadLine();
//    string[] commands = command!.Split(' ');
//    switch (commands[0])
//    {
//        case "help":
//            Console.WriteLine("touch-создание файла touch file");
//            Console.WriteLine("copy - копирование файла copy source destination");
//            Console.WriteLine("move - перемещение файла move source destination");
//            Console.WriteLine("delete - удаление файла delete file");
//            break;
//        case "touch":
//            FileStream file = File.Create(@$"{path}\{commands[1]}");
//            break;
//        case "delete":
//            FileInfo fileDel = new FileInfo(@$"{path}\{commands[1]}");
//            if (fileDel.Exists)
//            {
//                fileDel.Delete();
//                Console.WriteLine("Файл удален");
//            }
//            else
//            {
//                Console.WriteLine("Файл не существует!");
//            }
//            break;
//        case "copy":
//            FileInfo fileSource = new FileInfo(@$"{path}\{commands[1]}");
//            if (fileSource.Exists)
//            {
//                fileSource.CopyTo(@$"{path}\{commands[2]}", true);
//            }
//            Console.WriteLine("Ваш файл скопирован");
//            break;
//        case "move":
//            FileInfo fileMove = new FileInfo(@$"{path}\{commands[1]}");
//            if (fileMove.Exists)
//            {
//                fileMove.MoveTo(@$"{path}\{commands[2]}", true);
//            }
//            break;
//        case "dir":
//            DirectoryInfo dir = new DirectoryInfo(path);
//            if (dir.Exists)
//            {
//                foreach (DirectoryInfo s in dir.GetDirectories())
//                {
//                    Console.WriteLine(s.Name);
//                }

//                foreach (FileInfo s in dir.GetFiles())
//                {
//                    Console.WriteLine(s.Name + " " + s.Length + " " + s.CreationTime);
//                }
//            }
//            break;
//    }
//}



//TOP

//string path = Environment.CurrentDirectory;
//while (true)
//{
//    Console.Write(path + ">"); string? command = Console.ReadLine();
//    string[] commands = command!.Split(' '); switch (commands[0])
//    {
//        case "help":
//            Console.WriteLine("touch-создание файла touch file"); 
//            Console.WriteLine("copy-копирование файла copy source destination");
//            Console.WriteLine("move-перемещение переименование файла move source destination"); 
//            Console.WriteLine("delete-удаление файла delete file");
//            break;
//        case "touch":
//            FileStream file = File.Create(@$"{path}\{commands[1]}"); break;
//        case "delete":
//            FileInfo fileDel = new FileInfo(@$"{path}\{commands[1]}");
//            if (fileDel.Exists) fileDel.Delete(); else Console.WriteLine("Файл не существует");
//            break;
//        case "copy":
//            FileInfo fileSource = new FileInfo(@$"{path}\{commands[1]}"); if (fileSource.Exists)
//            {
//                fileSource.CopyTo(@$"{path}\{commands[2]}", true);
//            }
//            break;
//        case "move":
//            FileInfo moveSource = new FileInfo(@$"{path}\{commands[1]}");
//            if (moveSource.Exists)
//            {
//                moveSource.MoveTo(@$"{path}\{commands[2]}", true);
//            }
//            break;
//        case "dir":
//            DirectoryInfo dir = new DirectoryInfo(path);
//            if (dir.Exists)
//            {
//                foreach (DirectoryInfo s in dir.GetDirectories())
//                {
//                    Console.WriteLine(s.Name);
//                }
//                foreach (FileInfo s in dir.GetFiles())
//                {
//                    Console.WriteLine(s.Name + " " + s.Length + " " + s.CreationTime);
//                }
//            }
//            break;
//        case "mkdir":
//            DirectoryInfo dirCreate = new DirectoryInfo(@$"{path}\{commands[1]}"); if (!dirCreate.Exists)
//            {
//                dirCreate.Create();
//            }
//            break;
//        case "deleteDir":
//            DirectoryInfo dirInfo = new DirectoryInfo(@$"{path}\{commands[1]}");
//            if (dirInfo.Exists)
//            {
//                dirInfo.Delete(true); Console.WriteLine("Каталог удален");
//            }
//            else
//            {
//                Console.WriteLine("Каталог не существует");
//            }
//            break;
//        case "cd":
//            switch (commands[1])
//            {
//                case "..":
//                    DirectoryInfo curInfo = new DirectoryInfo(@$"{path}"); DirectoryInfo? newDir = curInfo.Parent;
//                    path = newDir!.FullName; break;
//                case "/":
//                    curInfo = new DirectoryInfo(@$"{path}");
//                    DirectoryInfo? rootDir = curInfo.Root; path = rootDir!.FullName;
//                    break;
//                default:
//                    curInfo = new DirectoryInfo(@$"{path}\{commands[1]}"); if (curInfo.Exists)
//                    {
//                        path = curInfo.FullName;
//                    }
//                    else
//                    {
//                        Console.WriteLine("Такого каталога не существует!!!");
//                    }
//                    break;
//            }
//            break;
//    }
//}


//Linq

//int? a = null;
//Console.WriteLine(a ?? 0);

Console.Write("Введиет размер массива: ");
int n = int.Parse(Console.ReadLine()!);
int[] mas = new int[n];
Random r = new Random();

for (int i = 0; i < n; i++)
{
    mas[i] = r.Next(-10, 11);
    Console.Write(mas[i] + " ");
}

//сумма
int s = 0;
foreach (int i in mas)
{
    s += i;
}
Console.WriteLine(s);
Console.WriteLine(mas.Sum());
Console.WriteLine(mas.Count());
Console.WriteLine(mas.Average());
Console.WriteLine(mas.Max());
Console.WriteLine(mas.Min());

int[] masLinq = mas.Where(i => i % 2 == 0).ToArray();
foreach (int item in masLinq)
{
    Console.Write(item + " ");
}
Console.WriteLine();


int[] mas2 = mas.Select(i => i * 2).ToArray();
foreach (int item in mas2)
{
    Console.Write(item + " ");
}