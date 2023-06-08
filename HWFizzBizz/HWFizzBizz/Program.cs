//1

Console.WriteLine("Введите числа через запятую: ");
string numbers = Console.ReadLine();
numbers = numbers.Replace(" ", "");
string[] arr = numbers.Split(',');
int[] arr2 = new int[arr.Length];

for (int i = 0; i < arr2.Length; i++)
{
    arr2[i] = int.Parse(arr[i]);
}
Console.WriteLine("Cумма: " + arr2.Sum());

//2

Console.WriteLine("Введите предложение: ");
string sentence = Console.ReadLine();
string[] array = sentence.Split(' ');
Console.WriteLine("Количество слов: " + array.Length);