using System.Diagnostics;
using System.IO.Compression;
////ZipFile 
////DefaultStream
////GZipStream

//string sourceFile = "problems2.pdf";
//string compressFile = "problems2.gz";
//string targetFile = "problems2_new.pdf";

//string zipSourceFolder = "D://Deskt//test";
//string zipFile = "D://Deskt//test.zip";
//string targetFolder= "D://Deskt//newtest";

//ZipFile.CreateFromDirectory(zipSourceFolder, zipFile); //Запаковка
//ZipFile.ExtractToDirectory(zipFile, targetFolder);  // Распаковка

//await CompressAsync(sourceFile,compressFile); //Запаковка
//await DecompressAsync(compressFile,targetFile); // Распаковка



//async Task CompressAsync(string sourceFile, string compressFile)
//{
//    using FileStream sourceStream = new FileStream(sourceFile, FileMode.OpenOrCreate);
//    using FileStream targetStream = File.Create(compressFile);
//    using GZipStream copmpressionStream = new GZipStream(targetStream, CompressionMode.Compress);
//    await sourceStream.CopyToAsync(copmpressionStream);
//    Console.WriteLine("Сжатие завершенно!");
//}

//async Task DecompressAsync(string compressFile, string targetFile)
//{
//    using FileStream sourceStream = new FileStream(compressFile, FileMode.OpenOrCreate);
//    using FileStream targetStream = File.Create(targetFile);
//    using GZipStream decopmpressionStream = new GZipStream(sourceStream, CompressionMode.Decompress);
//    await decopmpressionStream.CopyToAsync(targetStream);
//}

// Файлы

//string path = @"..\text.txt";
//string newPath = @"..\newtext.txt";
//string movePath = @"text.txt";
//string distFile = @"dtext.txt";
//string resPath = @"rtext.txt";

//FileInfo fileInfo= new FileInfo(path);
//FileInfo newInfo = new FileInfo(movePath);

//if (newInfo.Exists)
//{
//    Console.WriteLine("Имя файла: "+ newInfo.Name);
//    Console.WriteLine("Время создания файла: " + newInfo.CreationTime);
//    Console.WriteLine("Размер файла: "+ newInfo.Length);
//    Console.WriteLine(newInfo.FullName);
//    Console.WriteLine(newInfo.Directory);
//    Console.WriteLine(newInfo.Attributes);
//    Console.WriteLine(newInfo.DirectoryName);
//    //fileInfo.CopyTo(newPath, true);
//    //fileInfo.MoveTo(movePath);
//    //newInfo.Delete();
//    newInfo.Replace(distFile, resPath, true);
//}

//DriveInfo[] drivers = DriveInfo.GetDrives();
//foreach (DriveInfo drive in drivers)
//{
//    Console.WriteLine(drive.Name);
//    Console.WriteLine(drive.DriveType);
//    if (drive.IsReady)
//    {
//        Console.WriteLine(drive.TotalSize);
//        Console.WriteLine(drive.TotalFreeSpace);
//        Console.WriteLine(drive.VolumeLabel);
//    }
//}

//string dirName = "C:\\";
//if (Directory.Exists(dirName))
//{
//    Console.WriteLine("Подкаталоги: ");
//    string[] dirs = Directory.GetDirectories(dirName);
//    foreach (string item in dirs)
//    {
//        Console.WriteLine(item);
//    }
//    Console.WriteLine("Файлы: ");
//    string[] files = Directory.GetFiles(dirName);
//    foreach (string item in files)
//    {
//        Console.WriteLine(item);
//    }
//}

//var directory = new DirectoryInfo(dirName);
//if (directory.Exists)
//{
//    Console.WriteLine("Папки: ");
//    DirectoryInfo[] dirs = directory.GetDirectories();
//    foreach (DirectoryInfo item in dirs)
//    {
//        Console.WriteLine(item.FullName);
//    }

//    Console.WriteLine("Files: ");
//    FileInfo[] files = directory.GetFiles();
//    foreach (FileInfo item in files)
//    {
//        Console.WriteLine(item.FullName);
//    }
//}

// Есть папка с файлами в определеном каталоге. Создать прорамму тип что делать с папкой переместить копировать или удалить его. выбор из 3х