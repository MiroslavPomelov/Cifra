// // Map
// const map: Map<string, number> = new Map<string, number>();
// map.set('first', 25);
// map.set('second', 45);
// map.set('third', 35);
// map.set('fourth', 20);


// if (map.has('second')) {
//     console.log('Ok')
// }
// else {
//     console.log('Ne ok')
// }

// console.log(map.get('second'));
// console.log(map.size);



// // Цикл for of итерирует ключам
// for (let key of map.keys()) {
//     console.log(key);
// }

// // Цикл for of итерирует значению
// for (let value of map.keys()) {
//     console.log(value);
// }



// // #1 Цикл for of итерирует коллекцию
// for (let pair of map) {
//     console.log(pair);
// }

// // #2 Цикл for of итерирует коллекцию
// for (let [key, value] of map.entries()) {
//     console.log(`Key ${key} \t Value ${value}`);
// }

// map.forEach((value, key) => {
//     console.log(value);
// });

// map.clear();









// let unusualMap: Map<object, boolean> = new Map<object, boolean>();

// const obj1 = {
//     name: 'Valeiy',
//     age: 32
// }

// const obj2 = {
//     name: 'Inokentiy',
//     age: 16
// }

// unusualMap.set(obj1, obj1.age > 18);
// unusualMap.set(obj2, obj2.age > 18);

// console.log(unusualMap.get(obj1));

















// SET

// let arr = [1, 10, 23, 44, 44, 55]
// let set: Set<number> = new Set<number>(arr);

// console.log(set);

// set.add(20);
// set.add(1212);
// set.add(22);
// set.add(2333);

// console.log(set);

// console.log(set.has(6));
// console.log(set.has(20));

// console.log(set.size);

// set.clear();