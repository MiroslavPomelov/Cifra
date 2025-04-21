export class Product {
    id: number;
    name: string;
    price: number;
    producer: string;
    weight: number;
    category: string;

    constructor(id: number, name: string, price: number, producer: string, weight: number, category: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.producer = producer;
        this.weight = weight;
        this.category = category;
    }
}