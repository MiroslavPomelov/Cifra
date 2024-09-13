// class Person {
//     public _name: string;
//     private _age: number;
//     constructor(name: string, age: number) {
//         this._name = name;
//         this._age = age;
//     }

//     public greet(): void {
//         console.log(`Привет ${this._name}`)
//     }

//     getAge(): number {
//         return this._age;
//     }

//     setAge(newAge: number): void {
//         this._age = newAge;
//     }
// }

// let user: Person = new Person('Valeriy', 25);






// class Person {
//     protected id: number;

//     constructor(id: number) {
//         this.id = id;
//     }
// }

// class Employee extends Person {

//     constructor(id: number) {
//         super(id);
//     }

//     public getId(): number {
//         return this.id;
//     }
// }





// class Person {
//     private _name: string;
//     private _age: number;

//     constructor(name: string, age: number) {
//         this._name = name;
//         this._age = age;
//     }

//     public get age(): number {
//         // let newAge: number = this._age * 4;

//         return this._age
//     }

//     public set age(value: number) {
//         this._age = value;
//     }
// }

// let user: Person = new Person('Valeriy', 34);
// console.log(user);

// user.age = 74;

















//=---------------------------------

// import { Example } from './module';

// let number: number = 10;
// let example: Example = new Example(number, 34);

// import { Sumator, Multipliar, Divider } from './math';

import * as Dath from './math';
let ex: Dath.Sumator = new Dath.Sumator();

