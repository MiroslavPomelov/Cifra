import { IStringable } from "../repository/interfaces/IStrigable";
import { Product } from "./Product";


export class User implements IStringable {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    listOfProducts: Product[] = [];


    constructor(id: number, name: string, age: number, phone: string, email: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
    }

    public toString(): string {
        return `${this.name} - ${this.email}`;
    }
}