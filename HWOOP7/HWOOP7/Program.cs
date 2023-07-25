using HWOOP7.France;
using HWOOP7.Germany;
using HWOOP7.Russia;

Moscow moscow = new Moscow();
moscow.Population = 13000000;
moscow.Print();
Berlin berlin = new Berlin();
berlin.Population = 9000000;
berlin.Print();
Pasris pasris = new Pasris();
pasris.Population = 11000000;
pasris.Print();

if (moscow.Population > berlin.Population && moscow.Population > pasris.Population)
{
    Console.WriteLine($"Население Москвы больше - {moscow.Population}");
}
else if (pasris.Population > moscow.Population && pasris.Population > berlin.Population)
{
    Console.WriteLine($"Население Парижа больше - {pasris.Population}");
}
else
{
    Console.WriteLine($"Население Берлина больше - {berlin.Population}");
}