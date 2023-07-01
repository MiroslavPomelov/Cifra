using System.Text;

Console.WriteLine("Введите путь файла: ");
string path = Console.ReadLine();

if (File.Exists(path))
{
    using (FileStream fstream = File.OpenRead(path))
    {
        //// выделяем массив для считывания данных из файла
        //byte[] buffer = new byte[fstream.Length];
        //// считываем данные
        //await fstream.ReadAsync(buffer, 0, buffer.Length);
        //// декодируем байты в строку
        //string textFromFile = Encoding.Default.GetString(buffer);
        //Console.WriteLine($"Текст из файла: {textFromFile}");
        long bytes = fstream.Length;
        Console.WriteLine("Размер: " + bytes);
        DateTime dt = File.GetLastWriteTime(path);
        Console.WriteLine("Дата последнего изменения: {0}.", dt);
        Console.WriteLine("Расширение: " + Path.GetExtension(path));
    }
}
else
{
    Console.WriteLine("Файл не существует!");
}


//Console.WriteLine("Введите текст для записи: ");
//string text = Console.ReadLine();

//using (FileStream fstream = new FileStream("home.txt", FileMode.OpenOrCreate))
//{
//    byte[] buffer = Encoding.Default.GetBytes(text);
//    // запись массива байтов в файл
//    await fstream.WriteAsync(buffer, 0, buffer.Length);
//    Console.WriteLine("Файл успешно записан!");
//}

//File.AppendAllText(path, "\r"+text);
//Console.WriteLine("Файл успешно записан!");

//File.Create("D:\\Deskt\\hwrk\\file1.txt");
//File.Create("D:\\Deskt\\hwrk\\file2.txt");