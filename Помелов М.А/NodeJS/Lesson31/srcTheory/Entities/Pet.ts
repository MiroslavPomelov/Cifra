import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public name: string;
    @Column()
    public age: number;
    @Column()
    public type: string;
    @Column()
    public breed: string;


    constructor(name: string, age: number, type: string, breed: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.breed = breed;
    }

}