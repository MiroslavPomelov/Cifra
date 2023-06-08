
int[] arr = new int[100];
string[] arr2 = new string[100];

for (int i = 0; i < arr.Length; i++)
{
    arr[i] = i + 1;
    arr2[i] = (i + 1).ToString();
    if (arr[i] % 3 == 0 && arr[i] % 5 == 0)
    {
        arr2[i] = "FizzBuzz";
    }
    else
    {
        if (arr[i] % 3 == 0)
        {
            arr2[i] = "Fizz";
        }
        if (arr[i] % 5 == 0)
        {
            arr2[i] = "Buzz";
        }
    }
}

foreach (string item in arr2)
{
    Console.WriteLine(item);
}