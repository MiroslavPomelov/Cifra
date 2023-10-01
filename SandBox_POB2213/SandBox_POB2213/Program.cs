namespace SandBox_POB2213
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //string name = null!;

            //name ??= string.Empty; //Сокращенная запись null
            ////?. - проверка на нул предшествующего вызова (все что после знака не работает)
            ////??= - проверка с переопределением

            //Console.WriteLine(name.Length);



            //virtual - override - спецификаторы полиморфизм
            Car[] cars = new Car[3];

            Nissan almera = new Nissan();
            Chevrolete aveo = new Chevrolete();
            Lada granta = new Lada();

            cars[0] = almera;
            cars[1] = aveo;
            cars[2] = granta;

            for (int i = 0; i < cars.Length; i++)
            {
                cars[i].GetCarCountry();
            }
        }

        //public static int GetQuantity(string parameter)
        //{
        //    string result = parameter ?? string.Empty; //?? - Если нулл то пустая строка иначе result = parameter.
        //    return result.Length;
        //}
    }

    class Car
    {
        public string CarType { get; set; }

        public virtual void GetCarCountry()
        {
            Console.WriteLine("Some country");
        }
    }

    class Nissan : Car
    {
        public string CarType { get; set; }

        public override void GetCarCountry()
        {
            Console.WriteLine("Japanese");
        }
    }

    class Chevrolete : Car
    {
        public string CarType { get; set; }

        public override void GetCarCountry()
        {
            Console.WriteLine("USA");
        }
    }

    class Lada : Car
    {
        public string CarType { get; set; }

        public override void GetCarCountry()
        {
            Console.WriteLine("Chinese");
        }
    }

    //sealed - запрет на наследование класса.
}