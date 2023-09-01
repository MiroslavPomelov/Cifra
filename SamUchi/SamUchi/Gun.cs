using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SamUchi
{
    internal class Gun
    {
        public Gun(bool isloaded)
        {
            this.isloaded = isloaded;
        }

        private bool isloaded;
        private int pool;

        private void Reloaded()
        {
            Console.WriteLine("Заряжаю...");

            pool = 4;
            isloaded = true;

            Console.WriteLine("Заряжено!");
        }

        public void Shoot()
        {
            if (!isloaded)
            {
                Console.WriteLine("Орудие не заряжено!");
                Reloaded();
            }
            else if (isloaded = true && pool > 0)
            {
                pool--;
                Console.WriteLine("ПЫЩ\nОсталось патронов: " + pool);
                if (pool == 0)
                {
                    Console.WriteLine("Патронов больше нет, нужна перезарядка!");
                    isloaded = false;
                }
            }
        }
    }
}
