

namespace Pattern_13._03._2024
{
    public abstract class Worker
    {
        protected string _name;
        protected int _age;

        protected Worker(string name, int age)
        {
            _name = name;
            _age = age;
        }

        public abstract Product Cooking();
    }
}
