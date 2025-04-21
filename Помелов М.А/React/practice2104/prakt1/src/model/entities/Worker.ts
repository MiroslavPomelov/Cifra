import { User } from "./User";

export class Worker {
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
}