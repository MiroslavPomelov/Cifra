

namespace Pattern_13._03._2024
{
    public class Breadworker : Worker
    {
        protected string _description;
        protected string _tasty;

        public Breadworker(string name, int age, string description, string tasty) : base(name, age)
        {
            _description = description;
            _tasty = tasty;
        }

        public override Product Cooking()
        {
            return new Cake(_name, _description, _tasty);
        }
    }
}
