// Слияние объектов

// let target = { first: 1 };
// let sourceOne = { second: 2 };
// let sourceTwo = { third: 3 };

// Object.assign(target, sourceOne, sourceTwo);

// console.log(target);




//Считать название ключей
// let person = {
//     name: 'Valeriy',
//     age: 32
// };

// // console.log(Object.keys(person));

// let keys = Object.keys(person);
// let values = Object.values(person);
// let pairs = Object.entries(person) // Получение пар

// let json = `{ ${keys[0]}: ${values[0] } ${keys[1]}: ${values[1]}}`
// let json2 = `{ ${pairs[0][0]}: ${pairs[0][1]} } ${pairs[1][0]}}: ${pairs[1][1]}}}`

// console.log(json);
// console.log(json2);



// let person = {
//     name: 'Valery'
// }
// console.log(person);

// // Object.freeze(person); // Объект не изменяем

// Object.seal(person); // Не меняет струтктуру
// person.name = 'Anatoly'

// console.log(person);






let person = {
    name: 'Valery'
}

Object.defineProperty(person, 'age', {
    value: 32,
    writable: false,
    enumerable: false,
    configurable: true
});

console.log(person.age);

console.log(Object.getOwnPropertyDescriptor(person, 'age'));

