import { User } from "../../entities/User";

export interface IRepository<T> {

    create(entity: T): void;
    readOne(id: number): void;
    readAll(): T[];
    update(entity: Partial<T>): void;
    delete(id: number): void;
}