import { Product } from "./Product";


export class User {
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
}