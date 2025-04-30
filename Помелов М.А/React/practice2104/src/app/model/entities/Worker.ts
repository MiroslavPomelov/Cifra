import { IObjectable } from "../repositories/interfaces/IObjectable";
import { IStringable } from "../repositories/interfaces/IStringable";
import { User } from "./User";

export class Worker implements IStringable, IObjectable {
  id: number;
  position: string;
  name: string;
  phone: string;
  listOfUsers: User[] = [];

  constructor(id: number, position: string, name: string, phone: string) {
    this.id = id;
    this.position = position;
    this.name = name;
    this.phone = phone;
  }

  public toString(): string {
    return `Должность:${this.position} Имя:${this.name}`;
  }

  public toObject(): object {
    return {
        id: this.id,
        position: this.position,
        name: this.name,        
        phone: this.phone       
    }
}
}
