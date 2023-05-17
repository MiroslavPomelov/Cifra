using System.Globalization;
using System.Text;

//Seek() - позволяет управлять положением курсора потока, начиная с которого производится чтение и запись.
// Применяется для параметра offset и позиция в файле. Позиция описывается 3 значениями:
//SeekOrigin.Begin - начало файла
//SeekOrigin.End - конец файла
//SeekOrigin.Current - текущая позиция файла

//string text = "Hello, world";
//using (FileStream fstream = new FileStream("text.txt", FileMode.OpenOrCreate))
//{
//    byte[] buffer = Encoding.Default.GetBytes(text);
//    fstream.Write(buffer, 0, buffer.Length);
//}

//using (FileStream fstream = new FileStream("text.txt", FileMode.OpenOrCreate))
//{
//    fstream.Seek(7, SeekOrigin.Begin);
//    byte[] buffer = new byte[5];
//    await fstream.ReadAsync(buffer, 0, buffer.Length);
//    string textFromFile = Encoding.Default.GetString(buffer);
//    Console.WriteLine(textFromFile);
//}

//using (FileStream fstream = new FileStream("text.txt", FileMode.OpenOrCreate))
//{
//    fstream.Seek(-5, SeekOrigin.End);
//    byte[] input = Encoding.Default.GetBytes("house");
//    await fstream.WriteAsync(input, 0, input.Length);
//}

//BufferedStream(Stream) - инициализирует новый экземпляр BufferedStream класса размер буффера по умолчанию 4096 байт


// Вывести строки которые начинаются с Т
//a

//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string line;
//    while ((line = sr.ReadLine()) != null)
//    {
//        if (line.StartsWith("T"))
//        {
//            Console.WriteLine(line);
//        }
//    }
//}

//b Если больше 30 символов в одной строке

//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string line;
//    while ((line = sr.ReadLine()) != null)
//    {
//        if (line.Length > 30)
//        {
//            Console.WriteLine(line);
//        }
//    }
//}

//c если в строке  3 пробелов и больше

//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string line;
//    while ((line = sr.ReadLine()) != null)
//    {
//        string[] mas = line.Split(' ');
//        if (mas.Length > 3)
//        {
//            Console.WriteLine(line);
//        }
//    }
//}

// все строки содержащие в качесьвее фрашгмента заданный текст

//Console.Write("Введите ткст: ");
//string str = Console.ReadLine();

//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string line;
//    while ((line = sr.ReadLine()) != null)
//    {
//        if (line.Contains(str))
//        {
//            Console.WriteLine(line);
//        }
//    }
//}


// Вывести количество строк в которых 5 букв и
// не асинхронное
//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string line;
//    int count = 0;
//    while ((line = sr.ReadLine()) != null)
//    {
//        string[] mas = line.Split('и');
//        if (mas.Length == 6)
//        {
//            count++;
//        }
//        Console.WriteLine(count);
//    }
//}

//// асинхронно весь текст

//string text = await sr.ReadToEndAsync();
//Console.WriteLine(text);
////асинхронно весь текст построчно
//string? line;
//while ((line = await sr.ReadToEndAsync())!=null)
//{
//    Console.WriteLine(line);
//}

//15.21 стр 207

//int numberstroke = 0;

//using (StreamReader sr = new StreamReader("Text.txt"))
//{
//    string? line;
//    while ((line = await sr.ReadLineAsync()) != null)
//    {
//        numberstroke++;
//        if (line.StartsWith("T"))
//        {
//            Console.WriteLine(numberstroke);
//            break;
//        }
//    }
//}


// Запись в файл
// Полная перезапись файла

//Console.Write("Введите строку: ");
//string? text = Console.ReadLine();
//using (StreamWriter sw =new StreamWriter("text.txt", false)) 
//{
//    await sw.WriteLineAsync(text);
//}

// Добавить что то в файл
//string? add = Console.ReadLine();
//using(StreamWriter sw =new StreamWriter("text.txt", true))
//{
//    await sw.WriteLineAsync(add);
//}


//15.24

//string? res=null;
//using (StreamReader sr = new StreamReader("text.txt"))
//{
//    string? line;
//	while ((line=await sr.ReadLineAsync())!=null)
//	{
//		res += line+'\n';
//	}
//}
//Console.WriteLine(res);

//using (StreamWriter sw = new StreamWriter("new.txt", false))
//{
//	await sw.WriteLineAsync(res);
//}

////string? revStr = res.Reverse().ToString();//в обратном порядке

//string[] mas = res.Split("\n");
//string revStr = null;
//for (int i = mas.Length-1; i >=0 ; i--)
//{
//	revStr += mas[i]+"\n";
//}

//using (StreamWriter sw = new StreamWriter("new.txt", true))
//{
//    await sw.WriteLineAsync(revStr);
//}

//15.29

string? res = null;
int numberstroke = 0;
using (StreamReader sr = new StreamReader("text.txt"))
{
    string? line;
    while ((line = await sr.ReadLineAsync()) != null)
    {
        numberstroke++;
        if (numberstroke / 2 == 0)
        {
            using (StreamWriter sw = new StreamWriter("new.txt", false))
            {
                await sw.WriteLineAsync(line);
            }

        }
        if (numberstroke % 2 == 1)
        {
            using (StreamWriter sw = new StreamWriter("new2.txt", true))
            {
                await sw.WriteLineAsync(line);
            }

        }
    }
}
Console.WriteLine(res);


//string? revStr = res.Reverse().ToString();//в обратном порядке




