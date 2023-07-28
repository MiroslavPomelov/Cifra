using Vectors;

Vector2D v1 = new Vector2D()
{
    X = 5,
    Y = 9
};

Vector2D v2 = new Vector2D()
{
    X = 12,
    Y = 19
};

Vector2D v3 = v1 + v2;
v3.Print();
Vector2D v4 = v1 - v2;
v4.Print();
Console.WriteLine(v1 * v2);
Console.WriteLine($"{v1.Cos(v2):F2}");
