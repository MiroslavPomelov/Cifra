import { Column } from "typeorm";

export class MotherBoeard {

    @Column()
    Frequency!: number;
    @Column()
    RunType!: string;
    @Column()
    MaxMemory!: number;
}