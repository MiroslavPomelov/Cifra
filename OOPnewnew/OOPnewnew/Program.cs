namespace OOPnewnew
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Programmer programmer = new Programmer();

            //programmer.SetAge(34);
            //Console.WriteLine(programmer.GetAge());

            //programmer.brainOverLoad = 40;
            //Console.WriteLine(programmer.brainOverLoad);


            Tel tel = new Tel();
            Tel secondTel = new Tel();

            Console.WriteLine("Стоимость 1 разговора {0}\nСтоимость 2 разговора {1}", tel.GetCost(4, 0.256), secondTel.GetCost(7, 1.432));
        }
    }

    //class Human
    //{
    //    private int _age;
    //    private int _height;
    //    private int _weight;
    //    private int _cost = 100;

    //    public void SetAge(int value)
    //    {
    //        _age = value;
    //    }

    //    public int GetAge()
    //    {
    //        return _age;
    //    }
    //}

    //class Programmer : Human
    //{
    //    public int brainOverLoad;
    //}

    class Tel
    {
        private int _dayOfWeek;
        private double _speechtime;
        private decimal _cost = 100;


        public void SetCost(int value)
        {
            _cost = value;
        }

        private void CorrectCost(int dayOfWeek, double speechtime)
        {
            _dayOfWeek = dayOfWeek;
            _speechtime = speechtime;

            if (_dayOfWeek > 5 && _dayOfWeek < 8)
            {
                _cost = _cost * (decimal)0.9;
            }
        }

        public decimal GetCost(int dayOfweek, double speechTime)
        {
            CorrectCost(dayOfweek, speechTime);

            return _cost*(decimal)_speechtime;
        }
    }

}