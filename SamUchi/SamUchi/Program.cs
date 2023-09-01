using SamUchi;

Gun gun = new Gun(false);

while (true)
{
    Console.WriteLine("1 - shoot, 2 - exit");
    int choice = int.Parse(Console.ReadLine());
    if (choice == 1)
    {
        gun.Shoot();
    }
    else
    {
        break;
    }
}


