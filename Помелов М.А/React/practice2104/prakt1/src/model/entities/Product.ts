import { IStringable } from "../repository/interfaces/IStrigable";

export class Product implements IStringable {
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

    public toString(): string {
        return `${this.name} \n Price: ${this.price} \n Producer: ${this.producer} \n Weight: ${this.weight} \n Category: ${this.category}`;
    }


}