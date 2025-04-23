import { Worker } from "../entities/Worker";
import { workerDataGenerator } from "./functions/generateFunctions";
import { IRepository } from "./interfaces/IRepository";


export class WorkerRepo implements IRepository<Worker> {
    listOfWorkers: Worker[] = [];

    constructor() {
        workerDataGenerator(50);
    }

    public create(worker: Worker) {
        this.listOfWorkers.push(worker);
        return this.listOfWorkers;
    }

    public readOne(id: number): Worker | undefined {

        try {
            const searchWorker: Worker | undefined = this.listOfWorkers.find(worker => worker.id == id);

            return searchWorker;

        } catch (error) {

            throw new Error('Reading error!' + error);
        }

    }

    public readAll(): Worker[] {
        return this.listOfWorkers;
    }

    public update(updateData: Partial<Worker>): void {
        try {

            let updatingWorker: Partial<Worker> | undefined = this.listOfWorkers.find(user => user.id == updateData.id);

            if (!updateData.id) throw new Error('Worker is not exist!');
            if (!updatingWorker) throw new Error('Worker is not exist!');

            updatingWorker = { ...updatingWorker, ...updateData };


        } catch (error) {

            throw new Error('Worker Product error!' + error);
        }
    }



    public delete(id: number): void {

        try {
            const deleteProduct: number = this.listOfWorkers.findIndex((product) => product.id == id);

            this.listOfWorkers.splice(deleteProduct, 1);

        } catch (error) {

            throw new Error('Delete user error!' + error);
        }
    }

}