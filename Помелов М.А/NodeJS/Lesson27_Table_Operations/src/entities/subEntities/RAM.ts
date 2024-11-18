import { Column } from "typeorm";

export class RAM {

    @Column()
    Frequency!: number;
    @Column()
    Type!: string;
    @Column()
    Capacity!: number;
}