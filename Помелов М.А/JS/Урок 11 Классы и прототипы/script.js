// // Создание класса:

// class Example {
//     // Создание свойств:
//     constructor(fieldOne, fieldTwo) {
//         this.fieldOne = fieldOne;
//         this.fieldTwo = fieldTwo;
//         this.another = 30;
//         this.age = 22;
//     }

//     get Age() {
//         return this.age;
//     }

//     set Age(newAge) {
//         if (newAge < 0) {
//             console.log('Возраст не может быть отрицательным');
//             return;
//         }
//         this.age = newAge;
//     }

//     displayInfo() {
//         console.log(this);
//         console.log(`${this.fieldOne}\n ${this.fieldTwo}\n ${this.another}\n`);
//     }
// }

// let example = new Example('Hello', 74);
// console.log(example.fieldOne);
// console.log(example.fieldTwo);
// console.log(example.another);

// example.displayInfo();

// example.Age = -1000;
// console.log(example.Age);











// class Animal {
//     constructor(name, breed) {
//         this.name = name;
//         this.breed = breed;
//     }

//     makeNoise() {
//         console.log(`${this.name} bplftn то звук`);
//     }
// }

// class Dog extends Animal {
//     constructor(name, breed, woolColor) {
//         super(name, breed);
//         this.woolColor = woolColor;
//     }

//     makeNoise() {
//         console.log(`${this.name} лает`);
//     }
// }

// let myDog = new Dog("Rex", 'Dvor', 'green');
// console.log(myDog.__proto__.__proto__);
// myDog.makeNoise();


// let vintage = false;

// class Car {
//     constructor(make = undefined, model, year) {
//         this.make = make;
//         this.model = model;
//         this.year = year;
//     }

//     displayino() {
//         console.log(this);
//     }

//     isVintage(year) {
//         if (year < 2000) {
//             return true;
//         }
//     }
// }


// let car = new Car('Mercedes', 'AMG', 2020);
// car.displayino();
// console.log(car.isVintage(2002));

// let secondCar = new Car('AMG', 2020);
// car.displayino();



// const person = {
//     name: 'Ivan'
// }

// const anotherPerson = {
//     __proto__: person
// }

// console.log(anotherPerson.name);