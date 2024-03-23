using System.Numerics;

namespace CommandMethod
{
    internal class Program
    {
        static void Main(string[] args)
        {
            House house = new House();

            ICommand lightOffCommand = new LightOffCommand(house);
            ICommand lightOnCommand = new LightOnCommand(house);

            CommandController controller = new CommandController();

            controller.SetCommand(lightOffCommand);
            controller.ExecuteCommand();

            controller.SetCommand(lightOnCommand);
            controller.ExecuteCommand();

        }
    }

    class DefaultCommand : ICommand
    {
        public void Execute() => Console.WriteLine("Команда не назначена");
    }

    interface ICommand
    {
        void Execute();
    }

    class LightOnCommand : ICommand
    {
        private House _house;

        public LightOnCommand(House phone)
        {
            _house = phone;
        }

        public void Execute()
        {
            _house.Light();
        }
    }

    class LightOffCommand : ICommand
    {
        private House _house;

        public LightOffCommand(House house)
        {
            _house = house;
        }

        public void Execute()
        {
            _house.Light();
        }
    }


    class CommandController
    {
        private ICommand _command;

        public CommandController()
        {
            _command = new DefaultCommand();
        }

        public void SetCommand(ICommand command)
        {
            _command = command;
        }

        public void ExecuteCommand()
        {
            _command.Execute();
        }

    }
    public class House
    {
        private bool _lightIsOff = true;

        public void Light()
        {
            if (_lightIsOff)
            {
                Console.WriteLine("Свет включен");
                _lightIsOff = false;
            }
            else
            {
                Console.WriteLine("Свет выключен");
                _lightIsOff = true;
            }
        }
    }
}