"use strict";
// class Person {
//     public _name: string;
//     private _age: number;
//     constructor(name: string, age: number) {
//         this._name = name;
//         this._age = age;
//     }
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const Math = __importStar(require("./math"));
let ex = new Math.Sumator();
