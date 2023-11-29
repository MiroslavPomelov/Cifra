using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace XMLPrakt
{
    public static class XMLWorker
    {
        public static void Serialize(List<Goods> goodsList)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Goods>));

            FileStream stream = new FileStream("goods.xml", FileMode.Create);
            serializer.Serialize(stream, goodsList);
            stream.Close();
        }

        public static List<Goods> Deserialize()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Goods>));
            List<Goods> list;
            using (FileStream stream = new FileStream("goods.xml", FileMode.Open))
            {
                list = (List<Goods>)serializer.Deserialize(stream)!;

                foreach (var good in list)
                {
                    Console.WriteLine($"Название - {good.Name}\n Описание: {good.Description}\n Цена: {good.Price}");
                }
                return list;
            }

        }
    }
}
