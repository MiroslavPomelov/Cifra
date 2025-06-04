namespace lesson23MVC.Models.Classes.UserModel
{
    public class User
    {
        private int v1;
        private string v2;
        private string v3;
        private string v4;
        private string v5;

        public User(int v1, string v2, string v3, string v4, string v5)
        {
            this.v1 = v1;
            this.v2 = v2;
            this.v3 = v3;
            this.v4 = v4;
            this.v5 = v5;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

    }
}
