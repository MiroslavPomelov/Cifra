"use strict";
// interface User {
//     id: number;
//     name: string;
//     age: string;
//     username: string;
//     password: string;
//     email: string;
// }
// //PICK
// type AuthentificatingPerson = Pick<User, 'username' | 'password'>;
// function authentificateUser(incommingData: AuthentificatingPerson): boolean {
//     return true;
// }
// // OMIT
// type OmitetAuthentificatingPerson = Omit<User, 'username' | 'password' | 'id'>;
// const newUSerForAuth: AuthentificatingPerson = {
//     username: "Valer",
//     password: "Valerssssss",
// }
// const OmitetSerForAuth: OmitetAuthentificatingPerson = {
//     name: "Valer",
//     age: "Valerssssss",
//     email: "Valerssssss",
// }
//RECORD
// type PersonKeys = 'name' | 'age' | 'address';
// type PersonRecord = Record<PersonKeys, string>
// const person: PersonRecord = {
//     name: "Valer",
//     age: "34",
//     address: "dsad"
// }
// interface Employee {
//     id: number;
//     name: string;
//     position: string;
// }
// type EmployeeRecord = Record<number, Partial<Employee>>;
// const employeeDictionary: EmployeeRecord = {
//     1: { id: 1, name: "Valeriy"},
//     2: { id: 2, name: "Anatoliy", position: "courier" },
//     3: { id: 3, name: "John", position: "casher" }
// }
//PARAMETRES
// function greet(name: string, age: number): string {
//     return `Hello, my name is ${name}, age ${age}`
// }
// type GreetParametres = Parameters<typeof greet>
// const funcArgs: GreetParametres = ['Valeriy', 34];
// function logAndExecute<T extends (...args: any) => any>(fn: T) {
//     return (...args: Parameters<T>): ReturnType<T> => {
//         console.log(args);
//         return fn(...args);
//     }
// }
// function add(a: number, b: number) {
//     return a + b;
// }
// const loggerAdd = logAndExecute(add);
// console.log(loggerAdd(2, 15));
function logFunctionCall(fn) {
    return (...args) => {
        console.log(...args);
        return fn(new Date().toISOString());
    };
}
function add(a, b) {
    return a + b;
}
function multiplys(a, b) {
    return a * b;
}
const logeAdd = logFunctionCall(add);
console.log(logeAdd(2, 15));
const multiply = logFunctionCall(multiplys);
console.log(logeAdd(2, 15));
