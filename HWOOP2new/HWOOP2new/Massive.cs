using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HWOOP2new
{
    internal class Massive
    {
        private List<int> dynamicMasssive = new List<int>(5);
        Random random = new Random();

        public Massive()
        {

        }

        public Massive(int elements)
        {
            for (int i = 0; i < elements; i++)
            {
                dynamicMasssive.Add(i);
            }
        }

        public void GenerateRandom()
        {

            for (int i = 0; i < dynamicMasssive.Count; i++)
            {
                dynamicMasssive[i] = random.Next(1, 100);
            }
        }

        public void RandomSort()
        {
            for (int i = dynamicMasssive.Count - 1; i >= 1; i--)
            {
                int j = random.Next(i + 1);

                int tmp = dynamicMasssive[j];
                dynamicMasssive[j] = dynamicMasssive[i];
                dynamicMasssive[i] = tmp;
            }
        }

        public void FindDiffrents()
        {
            int count = 0;
            dynamicMasssive.Sort();
            for (int i = dynamicMasssive.Count - 1; i >= 1; i--)
            {
                if (dynamicMasssive[i] != dynamicMasssive[i - 1])
                {
                    count++;
                }
            }
            Console.WriteLine("Разных элементов в массиве = " + count);
        }


        public void Print()
        {
            for (int i = 0; i < dynamicMasssive.Count; i++)
            {
                Console.WriteLine(dynamicMasssive[i]);
            }
            Console.WriteLine();
        }
        public void Sort()
        {
            dynamicMasssive.Sort();
            Print();
        }
    }
}
