using HWOOP6;
int[] arraynum = { 1, 2, 3, 4, 5 };
char[] arraychar = { 'a', 'b', 'c', 'd', 'e' };

Average.Print(arraynum);
Console.WriteLine($"Среднее арифметическое массива: {Average.AverageMas(arraynum)}");
Console.WriteLine();
Replace.Repl(arraychar);
Replace.Print2(arraychar);