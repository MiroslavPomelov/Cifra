// // 1 способ создания через литерал
// let person = {
//     firstName: 'Ivan',
//     lastName: 'Ivanov',
//     age: 30
// }

// //2 способ - Object
// let secondPerson = new Object();
// secondPerson.name = 'Ivan';
// secondPerson.age = 32;

//3 способ - функция конструктор
// function Person(firstName, lastName, age) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
// }

// let thirdPerson = new Person('Petr', 'Petrov', 33);

// console.log(thirdPerson.firstName); //точечная нотация
// console.log(thirdPerson['age']);  // скобочная нотац










// let person = {
//     firstName: 'A',
//     lastName: 'B',
//     age: 33,

//     greet: function() {
//         console.log(`Привет, меня зовут ${this.firstName}`);
//     },

//     addAge: function(newAge) {
//         this.age += newAge;
//     },

//     getAge: function()  {
//         return this.age;
//     }
// }

// person.lastName = 'Ivanov';
// console.log(person);

// person.greet();
// person.addAge(5);
// console.log(person.getAge());
// console.log(person);











// let person = {
//     firstName: 'A',
//     lastName: 'B'
// };

// console.log(person);


// //Динамическое создание свойств
// person.age = 32;
// console.log(person);

// // delete person.age;
// // console.log(person);


// for (let key in person) {
//     console.log(`${key}, а значаение его ${person[key]}`);
// };






function Car(make, model, year) {
    this.make = make,
        this.model = model,
        this.year = year,

        this.displayInfo = function () {
            console.log(`${this.make} - ${this.model} - ${this.year}`);
            display
        },

        this.isVintage = function (Car) {
            if (Car.year <= 2000) {
                return true;
            }
        }

}

function Car(make, model) {
    this.make = '',
        this.model = '',

        this.displayInfo = function () {
            console.log(`${this.make} - ${this.model} - ${this.year}`);
        },

        this.isVintage = function (Car) {
            if (Car.year <= 2000) {
                return true;
            }
            else{
                return false;
            }
        }
}

function Car() {
    this.make = 'unknown',
        this.make = 'unknown',
        this.year = 2024,

        this.displayInfo = function () {
            console.log(`${this.make} - ${this.model} - ${this.year}`);
        },

        this.isVintage = function (Car) {
            if (Car.year <= 2000) {
                return true;
            }
        }
}



let firstCar = new Car('Merc', 'Germany', 1920);
let secondCar = new Car('Merc', 'Germany');
let thirdCar =  new Car();

for (let key in firstCar) {
    console.log(`${key} - ${firstCar[key]}`);
};

firstCar.displayInfo();


