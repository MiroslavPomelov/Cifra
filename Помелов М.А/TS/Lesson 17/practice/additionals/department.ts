import { Company } from './employee';

export class Department {
    private _name: string;
    private _workers: Array<Company.Employee>;

    constructor(_name: string, _workers: Array<Company.Employee>) {
        this._name = _name;
        this._workers = _workers;
    }

    addEmployee(employee: Company.Employee): void {
        this._workers.push(employee);
    }

    getEmployee(): string {
        let employers: string = '';
        for (let i = 0; i < this._workers.length - 1; i++) {
            employers += this._name + this._workers[i].getInfo() + ' ';
        }

        return employers;
    }
}