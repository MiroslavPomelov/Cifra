using System.Globalization;

namespace Behav_povedenie
{
    internal class Program
    {
        static void Main(string[] args)
        {
            
        }
    }

    public interface IMediatorBase
    {
        void SendData(Collegue collegue);
        void GetData(Collegue collegue);
    }

    public abstract class Collegue
    {
        public void GetData(string data)
        {
            throw new NotImplementedException();
        }

        public void SendData(string data)
        {
            throw new NotImplementedException();
        }
    }

    public class Manager : IMediatorBase
    {
        public void GetData(Collegue collegue)
        {
            if (collegue is Officiant)
            {
                
            }
            else
            {

            }
        }

        public void SendData(Collegue collegue)
        {
            if (true)
            {

            }
        }
    }

    public class Officiant : Collegue
    {
        public string Order { get; set; }

        public Officiant(string order)
        {
            Order = order;
        }

    }

    public class Cooker : Collegue
    {

    }
}