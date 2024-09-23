export namespace Company {
    export class Employee {
        private _name: string;
        private _age: string;
        private _level: string;

        constructor(_name: string, _age: string, _level: string) {
            this._age = _age;
            this._level = _level;
            this._name = _name;
        }

        getInfo(): void {
            console.log(`${this._name} ${this._age} ${this._level}`)
        }
    }


}