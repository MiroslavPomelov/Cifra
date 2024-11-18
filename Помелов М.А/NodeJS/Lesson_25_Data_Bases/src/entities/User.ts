import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// Entity - обертка класса для описания таблицы
// PrimaryGeneratedColumn - id
// Column - колонка таблицы

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;
    @Column()
    lastName!: string;
    @Column()
    age!: number;
}