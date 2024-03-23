namespace Bridge
{
    class Program
    {
        static void Main(string[] args)
        {
            // Создание объектов с разными реализациями
            Shape circleWindows = new Circle(10, 20, 30, new DrawApiWindows());
            Shape circleLinux = new Circle(15, 25, 35, new DrawApiLinux());
            Shape circleMacOS = new Circle(20, 30, 40, new DrawApiMacOS());

            Shape squareWindows = new Square(50, 60, 70, new DrawApiWindows());
            Shape squareLinux = new Square(55, 65, 75, new DrawApiLinux());
            Shape squareMacOS = new Square(60, 70, 80, new DrawApiMacOS());

            // Рисование фигур
            circleWindows.Draw();
            circleLinux.Draw();
            circleMacOS.Draw();

            squareWindows.Draw();
            squareLinux.Draw();
            squareMacOS.Draw();
        }
    }

    // Абстракция - Фигура
    abstract class Shape
    {
        protected IDrawApi drawApi;

        protected Shape(IDrawApi drawApi)
        {
            this.drawApi = drawApi;
        }

        public abstract void Draw();
    }

    // Реализация - API для рисования
    interface IDrawApi
    {
        void DrawCircle(int x, int y, int radius);
        void DrawSquare(int x, int y, int side);
    }

    // Конкретная реализация - API для рисования на Windows
    class DrawApiWindows : IDrawApi
    {
        public void DrawCircle(int x, int y, int radius)
        {
            Console.WriteLine($"Рисуем круг на Windows в положении ({x}, {y}) с радиусом {radius}");
        }

        public void DrawSquare(int x, int y, int side)
        {
            Console.WriteLine($"Рисуем квадрат на Windows в положении ({x}, {y}) со стороной {side}");
        }
    }

    // Конкретная реализация - API для рисования на Linux
    class DrawApiLinux : IDrawApi
    {
        public void DrawCircle(int x, int y, int radius)
        {
            Console.WriteLine($"Рисуем круг на Linux в положении ({x}, {y}) с радиусом {radius}");
        }

        public void DrawSquare(int x, int y, int side)
        {
            Console.WriteLine($"Рисуем квадрат на Linux в положении ({x}, {y}) со стороной {side}");
        }
    }

    // Конкретная реализация - API для рисования на MacOS
    class DrawApiMacOS : IDrawApi
    {
        public void DrawCircle(int x, int y, int radius)
        {
            Console.WriteLine($"Рисуем круг на MacOS в положении ({x}, {y}) с радиусом {radius}");
        }

        public void DrawSquare(int x, int y, int side)
        {
            Console.WriteLine($"Рисуем квадрат на MacOS в положении ({x}, {y}) со стороной {side}");
        }
    }

    // Конкретная абстракция - Круг
    class Circle : Shape
    {
        private readonly int _x, _y, _radius;

        public Circle(int x, int y, int radius, IDrawApi drawApi) : base(drawApi)
        {
            _x = x;
            _y = y;
            _radius = radius;
        }

        public override void Draw()
        {
            drawApi.DrawCircle(_x, _y, _radius);
        }
    }

    // Конкретная абстракция - Квадрат
    class Square : Shape
    {
        private readonly int _x, _y, _side;

        public Square(int x, int y, int side, IDrawApi drawApi) : base(drawApi)
        {
            _x = x;
            _y = y;
            _side = side;
        }

        public override void Draw()
        {
            drawApi.DrawSquare(_x, _y, _side);
        }
    }
}