import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Cooler } from './subEntities/Cooler';
import { MotherBoeard } from './subEntities/MotherBoard';
import { Videocard } from './subEntities/Videocard';
import { RAM } from './subEntities/RAM';
import { CPU } from './subEntities/CPU';



@Entity()
export class SystemUnit {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column(() => Cooler)
    Cooler!: Cooler;

    @Column(() => MotherBoeard)
    MotherBoard!: MotherBoeard;

    @Column(() => Videocard)
    Videocard!: Videocard;

    @Column(() => CPU)
    CPU!: CPU;

    @Column(() => RAM)
    RAM!: RAM;
}