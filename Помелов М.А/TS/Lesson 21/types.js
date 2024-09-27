"use strict";
// type Person = {
//     name: string;
//     age: number;
//     address: {
//         street: string;
//         city: string;
//     }
// }
// type PersonName = Person['name'];
// type PersonAge = Person['age'];
// type PersonAddress = Person['address'];
// type StringArray = string[];
// type StringArrayElement = StringArray[number];
// type Person = {
//     name: string;
//     age: number;
//     address: {
//         street: string;
//         city: string;
//     }
// }
// type PersonNameOrAge = Person['name' | 'age'];
// type Car = {
//     make: string;
//     model: string;
//     year: number;
// }
// type CarMake = Car['make'];
// type CarModel = Car['model'];
// type CarYear= Car['year'];
// type Company = {
//     name: string;
//     address: {
//         street: string;
//         city: string;
//     }
//     employers: {
//         name: string;
//         role: string;
//     }
// }
// type AddressType = Company['address']['city'];
// type Car = {
//     make: string;
//     model: string;
//     year: number;
//     iselectric: boolean;
// }
// let vehicles = [
//     {
//         make: "Germany",
//         model: "bmw",
//         year: 2020,
//         iselectric: true
//     },
//     {
//         make: "Germany",
//         model: "audi",
//         year: 2024,
//         iselectric: true
//     },
//     {
//         make: "China",
//         model: "Haval",
//         year: 3024,
//         iselectric: true
//     }
// ];
// type Vehicle = typeof vehicles;
// type VehicleElementType = typeof vehicles[number]["model"]; 
//GUARD
// function padLeft(value: string, padding: number | string | null) {
//     if (typeof padding === 'string') {
//         return 'sda';
//     }
//     if (typeof padding === 'number') {
//         return 2;
//     }
//     if (padding === null) {
//         return 22323;
//     }
//     throw new Error("Error");
// }
// class Dog {
//     bark() {
//         console.log('Bark!');
//     }
// }
// class Cat {
//     meow() {
//         console.log('Meow!');
//     }
// }
// // typeof для примитивов а instanceof для классовых типов
// const makeNoise = (pet: Dog | Cat) => {
//     if (pet instanceof Dog) {
//         pet.bark();
//     }
//     else if (pet instanceof Cat) {
//         pet.meow();
//     }
// }
// type Admin = {
//     name: string;
//     privilages: string[];
// }
// type User = {
//     name: string;
//     email: string;
// }
// type Person = Admin | User;
// function printPersonInfo(person: Person) {
//     if ('privilages' in person) {
//         console.log(` ${person.privilages.join(', ')}`);
//     }
//     if ('email' in person) {
//         console.log(`${person.email}`);
//     }
// }
// let admin: Admin = {
//     name: 'ASdasd',
//     privilages: ["asd", 'dsad']
// }
// let user: User = {
//     name: 'ASdasssssssssd',
//     email: "dasdasdas"
// }
// printPersonInfo(admin);
// printPersonInfo(user);
// type Fish = {
//     swim: () => void
// };
// type Bird = {
//     fly: () => void
// };
// function isFish(unknownAnimal: Fish | Bird): unknownAnimal is Fish {
//     return (unknownAnimal as Fish).swim !== undefined;
// }
// function move(animal: Fish | Bird) {
//     if (isFish(animal)) {
//         animal.swim();
//     }
//     else {
//         animal.fly();
//     }
// }
// let realBird: Bird = { fly: () => { console.log("I can fly") } }
// let realFish: Fish = { swim: () => { console.log("I can swim") } }
// move(realBird);
// move(realFish);
