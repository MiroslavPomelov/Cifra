"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
var Company;
(function (Company) {
    class Employee {
        constructor(_name, _age, _level) {
            this._age = _age;
            this._level = _level;
            this._name = _name;
        }
        getInfo() {
            console.log(`${this._name} ${this._age} ${this._level}`);
        }
    }
    Company.Employee = Employee;
})(Company || (exports.Company = Company = {}));
