﻿using Praktik19._01._2024;

namespace PraktikV2.Products
{
    public class CPU : Good
    {
        public decimal Discount { get; set; } = 1;
        public CPU(string? name, int quantity, decimal price) : base(name, quantity, price)
        {
            price = price * Discount;
        }

        public override void GetDiscount(User user)
        {
            base.GetDiscount(user);
        }
    }
}
