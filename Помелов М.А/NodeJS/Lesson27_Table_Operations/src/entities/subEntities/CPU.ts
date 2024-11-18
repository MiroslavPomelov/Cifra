import { Column } from "typeorm";

export class CPU {

    @Column()
    Frequency!: number;
    @Column()
    CorsNumber!: number;
    @Column()
    TDP!: number;
    @Column()
    Consumption!: number;
}