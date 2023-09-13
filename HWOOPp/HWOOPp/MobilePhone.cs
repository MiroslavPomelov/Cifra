using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HWOOPp
{
    internal class MobilePhone
    {
        private long _number ;
        private string _phoneHolder;
        private int _sum;

        public MobilePhone(long number, string phoneHolder, int sum)
        {
            _number = number;
            _phoneHolder = phoneHolder;
            _sum = sum;
        }

        public void AddSum(int sum)
        {
            this._sum += sum;
        }

        public void Payment(int tarif, int time)
        {
            _sum -= time * tarif;
        }

        public void Balance()
        {
            Console.WriteLine($"Здравствуйте {_phoneHolder}!\nВаш баланс {_number}: {_sum} руб.");
        }
    }
}
