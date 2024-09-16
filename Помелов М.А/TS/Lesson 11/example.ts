// interface IPerson {
//     name: string;
//     age: number;
// }

// let person: IPerson = {
//     name: "Ivanov Ivan",
//     age: 34
// }






// interface ICar {
//     readonly provider: string;
//     model: string;
//     yearOfSales?: Date;
// }

// class Car implements ICar {
//     readonly provider: string;
//     model: string;
//     yearOfSales: Date;

//     constructor(provider: string, model: string, yearOfSales: Date) {
//         this.provider = provider;
//         this.model = model;
//         this.yearOfSales = yearOfSales;
//     }
// }

// let car1: ICar = {
//     provider: "Toyota",
//     model: "Camry",
//     yearOfSales: new Date(2017, 12, 5)
// }

// let car2: ICar = {
//     provider: "Honda",
//     model: "Civic"
// }

// let carExample: ICar = new Car("Toyota", "Camry", new Date(2017, 12, 5));









// interface ICalculator {
//     summ(first: number, second: number): number;
//     subsctract(first: number, second: number): number;
// }

// let calculator: ICalculator = {
//     summ: (first: number, second: number): number => {
//         return first + second;
//     },

//     subsctract: (first: number, second: number): number => {
//         return first - second;
//     }
// }





// interface IStringProcessor {
//     (input: string): string;
// }

// let makeBigLetters: IStringProcessor = (input: string): string => {
//     return input + "ppppp";
// }


//---------------------------------------------------------------------------