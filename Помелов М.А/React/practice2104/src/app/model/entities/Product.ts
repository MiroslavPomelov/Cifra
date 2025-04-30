import { th } from "@faker-js/faker";
import { IObjectable } from "../repositories/interfaces/IObjectable";
import { IStringable } from "../repositories/interfaces/IStringable";

export class Product implements IStringable, IObjectable {
    id: number;
    name: string;
    price: number;
    producer: string;
    weight: number;
    category: string;

    constructor(id: number, name: string, price: number, producer: string, weight: number, category: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.producer = producer;
        this.weight = weight; 
        this.category = category; 

    }

    public toString(): string {
        return `${this.name}\n Цена:${this.price}\n Прозводитель:${this.producer}\n Вес:${this.weight}\n Категория:${this.category}`       
    }

    public toObject(): object {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            producer: this.producer,
            weight: this.weight,
            category: this.category
        }
    }

}