import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { BaseEntity } from "../BaseEntity";

@Entity()
export class Book extends BaseEntity {
    @Column()
    title: string;
    @Column()
    content: string;

    constructor(description: string, title: string, content: string) {
        super(description);
        this.title = title;
        this.content = content;
    }
}