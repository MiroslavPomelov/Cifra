// function getType(value) {
//     return typeof value;
// }

// console.log(getType(4));
// console.log(getType('4'));
// console.log(getType(() => {}));
// console.log(getType({ name: 'Hello', age: 32 }));
// console.log(getType(undefined));
// console.log(getType(null));





// function multiplier(factor) {
//     return function (number) {
//         return number * factor;
//     }
// }

// let double = multiplier(2);
// let triple = multiplier(2);

// console.log(double(10)); 
// console.log(triple(20)); 






// function getDevidence(first, second) {
//     if (second === 0) {
//         console.error('Unhandled Exception');

//         return null;
//     }

//     return first / second;
// }

// console.log(getDevidence(10, 0));









// Функция со знач по умолч.

// let greeting = (name = 'Gost') => {
// console.log('Привет ' +  name + '!');
// }

// greeting();
// greeting("Mir");




// let createItem = function (title, price = 100, isActive = true) {
//     console.log(`Item: ${title}, Price: ${price}, Active: ${isActive}`);
// }

// createItem();
// createItem('Box');
// createItem('Box', 5000);
// createItem('Box', 5000, false);






// function print(message = 'По умолчанию') {
//     console.log(message);
// }

// print("Сщщобщение");
// print(undefined);
// print(null);







// function myFunc() {
//     console.log(this.innerHeight);
//     console.log(this.innerWidth);
// }

// myFunc();








// let myObject = {
//     name: 'Valery',
//     intrduse: function () {
//         let innerFunc = () => {
//             console.log(this.name);
//         }

//         innerFunc();
//     }
// }

// myObject.intrduse();







// let person = {
//     name: "Charlie"
// }


// function greet() {
//     console.log(this.name);
// }

// greet.call(person);


// let greetPerson = greet.bind(person);

// greetPerson();

// function greet(obj) {
//     console.log(obj.name);
// }


// greet(person);


let arr = [1, 2, 3, 4, 5];


function getValues(arr) {

    console.log(arr.max() + '-' + arr.min());
}

getValues([1, 2, 3, 4, 5]);


