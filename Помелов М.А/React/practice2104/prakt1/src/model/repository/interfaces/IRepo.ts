import { User } from "../../entities/User";

export interface IRepo<T> {

    create(entity: T): void;
    read(id: number): void;
    update(entity: Partial<T>): void;
    delete(id: number): void;
}