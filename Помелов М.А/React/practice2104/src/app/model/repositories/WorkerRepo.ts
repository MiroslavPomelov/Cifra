import { Worker } from "../entities/Worker";
import { workerDataGenerator } from "./functions/generateFunction";
import { IRepository } from "./interfaces/IRepository";

export class WorkerRepo implements IRepository<Worker> {
  listOfWorkers: Worker[] = [];

  constructor() {
    this.listOfWorkers = workerDataGenerator(50);
  }

  public create(newWorker: Worker): void {
    this.listOfWorkers.push(newWorker);
  }

  public readOne(id: number): Worker | undefined {
    try {
      const searchigWorker: Worker | undefined = this.listOfWorkers.find(
        (worker) => worker.id == id
      );
      return searchigWorker;
    } catch (error) {
      throw new Error("Error searching user:" + error);
    }
  }

  public readAll(): Worker[] {
    return this.listOfWorkers;
  }

  update(updateData: Partial<Worker>): void {
    try {
      let searchigWorker: Partial<Worker> | undefined = this.listOfWorkers.find(
        (worker) => worker.id == updateData.id
      );

      if (!searchigWorker) throw new Error();

      searchigWorker = { ...searchigWorker, ...updateData };
    } catch (error) {
      throw new Error("Error updating user" + error);
    }
  }
  delete(id: number): void {
    try {
      const indexToDelete: number = this.listOfWorkers.findIndex(
        (worker) => worker.id == id
      );
      if (indexToDelete) {
        this.listOfWorkers.splice(indexToDelete, 1);
      }
    } catch (error) {
      throw new Error("Error deleting user" + error);
    }
  }
}
