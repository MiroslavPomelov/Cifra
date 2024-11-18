import { Column } from "typeorm";

export class Cooler {

    @Column()
    TDP!: number;
    @Column()
    RPM!: number;
}