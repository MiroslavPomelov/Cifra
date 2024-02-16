namespace ConsoleApp3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            ////1

            //string stroka = "Привет, как дела?";
            //Console.WriteLine("Введите строку:");
            //string user = Console.ReadLine();
            //bool contains = stroka.Contains(user);
            //if (contains)
            //{
            //    Console.WriteLine("Верно!");
            //}
            //else
            //{
            //    Console.WriteLine("Ошибка!");
            //}


            ////2

            //Console.WriteLine("Введите строку:");
            //string userOne = Console.ReadLine();

            //Console.WriteLine("Введите символ для замены:");
            //string userChar = Console.ReadLine();

            //Console.WriteLine("Введите символ, на который нужно заменить:");
            //string userRep = Console.ReadLine();

            //string result = userOne.Replace(userChar, userRep);
            //Console.WriteLine(result);


            ////3

            //Console.Write("Введите строку:");
            //string strokaOne = Console.ReadLine();

            //Console.Write("Введите слово:");
            //string word = Console.ReadLine();

            //int counter = 0;

            //string[] stroka = strokaOne.Split(' ', ',');            

            //for (int i = 0; i < stroka.Length; i++)
            //{
            //    if (stroka[i] == word)
            //    {
            //        counter++;
            //    }                
            //}
            //Console.WriteLine(counter);

            ////3 мой вариант
            //Console.Write("Введите строку:");
            //string strokaOne = Console.ReadLine();

            //Console.Write("Введите слово:");
            //string word = Console.ReadLine();

            //if (strokaOne.Contains(word))
            //{
            //    Console.WriteLine("Слово есть!");
            //}
            //else
            //{
            //    Console.WriteLine("Слова нет!");
            //}


            ////4

            //Console.Write("Введите строку:");
            //string strokaOne = Console.ReadLine();

            //Console.Write("Введите слово для замены:");
            //string word = Console.ReadLine();

            //string charOne = "*******";

            //string[] result = strokaOne.Split(' ');

            //for (int i = 0; i < result.Length; i++)
            //{
            //    if (result[i] == word)
            //    {
            //        result[i] = charOne;
            //    }
            //    Console.Write(result[i] + " ");
            //}

            //// 5

            //Console.Write("Введите ФИО:");
            //string name = Console.ReadLine();

            //string[] result = name.Split(' ');

            //for (int i = 0; i < result.Length; i++)
            //{                
            //    Console.WriteLine(result[i]);
            //}


            //// 6

            //Console.Write("Введите слова:");
            //string word = Console.ReadLine();

            //string[] result = word.Split(',');

            //for (int i = 0; i < result.Length; i++)
            //{
            //    Console.WriteLine(result[i]);
            //}


            //// 7

            //Console.Write("Введите слова:");
            //string word = Console.ReadLine();

            //string[] result = word.Split(',');

            //for (int i = 0; i < result.Length; i++)
            //{
            //    Console.WriteLine(result[i]);
            //}


            //// 8

            //Console.Write("Введите числа:");
            //string cifra = Console.ReadLine();

            //string[] result = cifra.Split(' ');

            //for (int i = 0; i < result.Length; i++)
            //{
            //    Console.WriteLine(result[i]);
            //}

            //// 8

            //Console.Write("Введите числа:");
            //string cifra = Console.ReadLine();

            //string[] result = cifra.Split(' ');
            //int sum = 0;
            //for (int i = 0; i < result.Length; i++)
            //{
            //    sum += Convert.ToInt32(result[i]);
            //}
            //Console.WriteLine(sum);



            // ПРАКТИКА игра "Сапёр"

            char[,] map = {
            {' ','#','#','#','#','#','#','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#','#','#','#','#','#','#'},
            };
            for (int i = 0; i < map.GetLength(0); i++)
            {
                for (int j = 0; j < map.GetLength(1); j++)
                {
                    Console.Write($"{map[i,j]}\t");
                }
                Console.WriteLine();
            }

            char[,] mapUser = {
            {' ','#','#','#','#','#','#','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#',' ',' ',' ',' ',' ','#'},
            {' ','#','#','#','#','#','#','#'},
            };
            for (int i = 0; i < mapUser.GetLength(0); i++)
            {
                for (int j = 0; j < mapUser.GetLength(1); j++)
                {
                    Console.Write($"{mapUser[i, j]}\t");
                }
                Console.WriteLine();
            }
            for (int i = 0;i < mapUser.GetLength(2); i++)
            {
                game[i][j][0] = 
            }
            Console.
        }
    }
}