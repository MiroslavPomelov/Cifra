using HWOOP9;

//1
Liquid liquid = new Liquid()
{
    Name = "Water",
    P = 10
};
Console.WriteLine(liquid.GetP(5));
Alcohol alcohol = new Alcohol()
{
    krep = 20
};
Console.WriteLine(alcohol.GetP(12));
Console.WriteLine(alcohol.GetKrep(40));

//2
Pair pair = new Pair()
{
    X = 3,
    Y = 7,
};
pair.Change(10, 5);
Console.WriteLine(pair.Pr());
Rectangle rectangle = new Rectangle()
{
    X =2, Y = 3,
};
Console.WriteLine(rectangle.Pr());
Console.WriteLine(rectangle.Perimeter());