

namespace Pattern_13._03._2024
{
    public class Pie : Product
    {
        public string _tasty;
        public Pie(string name, string description, string pieName) : base(name, description)
        {
            _tasty = pieName;
        }

    }
}
