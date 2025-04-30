
export interface IRepository<T> {     
    create(t: T): void;
    readOne(id: number): T | undefined;
    readAll(): T[];
    update(entity: Partial<T>): void;
    delete(id: number): void;   
}
  
    