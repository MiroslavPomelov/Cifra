import { IStringable } from "../repository/interfaces/IStrigable";
import { User } from "./User";

export class Worker implements IStringable {
    id: number;
    position: string;
    name: string;
    phone: string;
    email: string;
    listOfUsers: User[] = [];


    constructor(id: number, position: string, name: string, phone: string, email: string) {
        this.id = id;
        this.position = position;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    public toString(): string {
        return `Position: ${this.position} \n Name: ${this.name} \n Phone: ${this.phone} \n Email: ${this.email}`;
    }
}