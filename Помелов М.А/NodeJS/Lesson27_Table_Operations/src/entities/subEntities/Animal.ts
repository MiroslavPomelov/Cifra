import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class Animal extends BaseEntity {
    @Column()
    name: string;
    @Column()
    age: number;

    constructor(description: string, name: string, age: number) {
        super(description);
        this.name = name;
        this.age = age;
    }
}