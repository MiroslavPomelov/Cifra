using HWOOP4;

Console.Write("Введите количество массивов: ");
int n = int.Parse(Console.ReadLine()!);
Massives massives = new Massives(n);
massives.Print();
massives.FindNumber();
massives.CouplingNewArray(n);
for (int i = 0; i < n; i++)
{
    Array array = array[i];

}
