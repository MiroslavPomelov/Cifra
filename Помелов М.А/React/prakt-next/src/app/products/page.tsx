'use client'
import ProductCard from "../components/ProductCard";

interface Product {
    name: string;
    price: number;
}

export default function Products() {

    const products: Product[] = [
        {
            name: 'Waterlemon',
            price: 500,
        },
        {
            name: 'Lemon',
            price: 100,
        },
        {
            name: 'Orange',
            price: 150,
        },
    ];

    return (
        <div>
            {products.map((item: Product, index: number) => (
                <ProductCard key={index} name={item.name} price={item.price} onBuy={() => alert('You bought product!')} />
            ))}
        </div>
    );
}