

namespace Pattern_13._03._2024
{
    public class Konditer : Worker
    {
        protected int _expirience;
        protected string _cakeName;
        protected string _description;
        protected string _weight;

        public Konditer(string name, int age, int expirience, string cakeName, string description, string weight) : base(name, age)
        {
            _expirience = expirience;
            _cakeName = cakeName;
            _description = description;
            _weight = weight;
        }

        public override Product Cooking()
        {
            return new Cake(_name, _description, _weight);
        }
    }
}
