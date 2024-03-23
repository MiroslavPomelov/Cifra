namespace Mediator
{
    class Program
    {
        static void Main(string[] args)
        {
            // Создаем посредника - материнскую плату
            IMotherboard motherboard = new Motherboard();

            // Создаем коллег - компоненты компьютера
            Colleague cpu = new CPU(motherboard);
            Colleague ram = new RAM(motherboard);
            Colleague gpu = new GPU(motherboard);
            Colleague hardDrive = new HardDrive(motherboard);

            // Выполняем операции через посредника
            cpu.PerformOperation("Выполнить вычисления");
            ram.PerformOperation("Загрузить данные");
            gpu.PerformOperation("Низкополигональная пирамида");
            hardDrive.PerformOperation("C");
        }
    }


    // Посредник
    interface IMotherboard
    {
        void PerformOperation(string operation, Colleague sender);
    }

    // Коллега
    abstract class Colleague
    {
        protected IMotherboard _motherboard;

        public Colleague(IMotherboard motherboard) => _motherboard = motherboard;

        public abstract void PerformOperation(string operation);
        public abstract void ExecuteOperation(string operation);
    }

    // Конкретные коллеги
    class CPU : Colleague
    {
        public CPU(IMotherboard motherboard) : base(motherboard) { }

        public override void PerformOperation(string operation)
        {
            _motherboard.PerformOperation(operation, this);
        }

        public override void ExecuteOperation(string operation)
        {
            Console.WriteLine($"Процессор выполняет операцию: {operation}");
        }
    }

    class RAM : Colleague
    {
        public RAM(IMotherboard motherboard) : base(motherboard) { }

        public override void PerformOperation(string operation)
        {
            _motherboard.PerformOperation(operation, this);
        }

        public override void ExecuteOperation(string data)
        {
            Console.WriteLine($"Оперативная память загружает данные: {data}");
        }
    }

    class GPU : Colleague
    {
        public GPU(IMotherboard motherboard) : base(motherboard) { }

        public override void PerformOperation(string operation)
        {
            _motherboard.PerformOperation(operation, this);
        }

        public override void ExecuteOperation(string figure)
        {
            Console.WriteLine($"Видеокарта рендерит графику фигуры: {figure}");
        }
    }

    class HardDrive : Colleague
    {
        public HardDrive(IMotherboard motherboard) : base(motherboard) { }

        public override void PerformOperation(string operation)
        {
            _motherboard.PerformOperation(operation, this);
        }

        public override void ExecuteOperation(string diskName)
        {
            Console.WriteLine($"Жесткий диск считывает данные с диска \"{diskName}\"");
        }
    }

    // Конкретный посредник
    class Motherboard : IMotherboard
    {
        public void PerformOperation(string operation, Colleague sender)
        {
            sender.ExecuteOperation(operation);
        }
    }

}