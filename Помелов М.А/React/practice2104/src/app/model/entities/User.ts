import { th } from "@faker-js/faker";
import { IObjectable } from "../repositories/interfaces/IObjectable";
import { IStringable } from "../repositories/interfaces/IStringable";
import { Product } from "./Product";

export class User implements IStringable, IObjectable{
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    city: string;
    birthYear: number;
    listOfProducts: Product[] = [];

    constructor(id: number, name: string, age: number, phone: string, email: string, city: string, 
        birthYear: number){
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.birthYear = birthYear; 
    }

    public toString(): string {
        return `Имя: ${this.name} Почта: ${this.email}`       
    }

    public toObject(): object {
        return  this;
        
        // {
        //     id: this.id,
        //     name: this.name,
        //     age: this.age,
        //     phone: this.phone,
        //     email: this.email,
        //     city: this.city,
        //     birthYear: this.birthYear
        // }
    }
}