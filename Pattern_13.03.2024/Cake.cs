

namespace Pattern_13._03._2024
{
    public class Cake : Product
    {
        public string _weight;
        public Cake(string name, string description, string cakeName) : base(name, description)
        {
            _weight = cakeName;
        }


    }
}
