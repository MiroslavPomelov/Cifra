import { Column } from "typeorm";

export class Videocard {

    @Column()
    Frequency!: number;
    @Column()
    RunType!: string;
    @Column()
    Consumption!: number;
}