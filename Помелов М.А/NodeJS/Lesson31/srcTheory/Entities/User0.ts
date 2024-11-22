import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Pet } from "./Pet";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;
    @Column()
    public email: string;
    @Column()
    public password: string;
    @Column()
    public firstname: string;
    @Column()
    public lastname: string;
    @Column()
    public age: number;
    @Column()
    public isActive: boolean;
    @Column()
    public registrationDate: Date;
    @Column()
    public lastLogin: Date;
    @OneToOne(() => Pet, { cascade: true })
    @JoinColumn()
    public pet: Pet;

    constructor(
        username: string,
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        age: number,
        isActive: boolean,
        registrationDate: Date,
        lastLogin: Date,
        pet: Pet
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.isActive = isActive;
        this.registrationDate = registrationDate;
        this.lastLogin = lastLogin;
        this.pet = pet;
    }


}