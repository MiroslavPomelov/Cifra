import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum PetTypes {
    dog,
    cat,
    dragon
}

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public name: string;
    @Column()
    public age: number;
    @Column()
    public type: PetTypes;
    @Column()
    public breed: string;


    constructor(name: string, age: number, type: PetTypes, breed: string) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.breed = breed;
    }

}