"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
class Department {
    constructor(_name, _workers) {
        this._name = _name;
        this._workers = _workers;
    }
    addEmployee(employee) {
        this._workers.push(employee);
    }
    getEmployee() {
        let employers = '';
        for (let i = 0; i < this._workers.length - 1; i++) {
            employers += this._name + this._workers[i].getInfo() + ' ';
        }
        return employers;
    }
}
exports.Department = Department;
