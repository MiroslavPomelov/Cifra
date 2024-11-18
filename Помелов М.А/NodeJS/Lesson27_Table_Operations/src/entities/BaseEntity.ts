import { PrimaryGeneratedColumn, Column } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description: string;

    constructor(description: string) {
        this.description = description;
    }
}