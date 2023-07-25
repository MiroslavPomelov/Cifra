using Figures;

Figure figure = new Figure("Figure");
figure.Display();
Rectangle rectangle = new Rectangle("Rectangle", 2, 2, 8, 8);
rectangle.Display();
Console.WriteLine();
Console.WriteLine(rectangle.Area());
RectangleColor rectangleColor = new RectangleColor("RectangleColor", 2, 2, 10, 10, 1);
Console.WriteLine();
rectangleColor.Display();