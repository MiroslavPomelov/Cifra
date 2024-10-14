const moment = require('moment');
// let now = moment();

// console.log(now.format());


// Изменение формата Даты
// const someData = moment('2024-08-15');
// console.log(someData.format('DD.MM.YYYY'));



// const now = moment();
// console.log(now.format('DD-MM-YYYY'));
// console.log(now.format('MMMM Do YYYY, h:mm:ss A'));
// console.log(now.format('dddd'));
// console.log(now.format('MMM Do YY'));



// Добавить
// const nextWeek = moment().add(7, 'day');
// console.log(nextWeek.format('DD-MM-YYYY'));

// Отнять
// const nextWeek = moment().subtract(7, 'day');
// console.log(nextWeek.format('DD-MM-YYYY'));

// Начало месяца
// const example = moment().startOf('month');
// console.log(example.format('DD-MM-YYYY'));



// const dateValidate = moment('2024-10-12', 'DD-MM-YYYY', true).isValid();
// console.log(dateValidate);




// Дата До или После
// const first = moment('2024-05-15');
// const second = moment('2023-08-22');

// console.log(first.isAfter(second));
// console.log(first.isBefore(second));
// console.log(first.isSame(second));


// const difference = first.diff(second, 'days');
// console.log(difference);





//Локализация по времени
// moment().localeData();
// const now = moment();
// console.log(now);

//Форматы
// const now = moment();
// console.log(now.format('L'));
// console.log(now.format('LL'));
// console.log(now.format('LLL'));
// console.log(now.format('LLLL'));




const loadDash = require('lodash');
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//1
let newArr = loadDash.chunk(arr, [size = 3]);

// for (let i = 0; i < newArr.length; i++) {
//     console.log(newArr[i]);
// }

//2
loadDash.fill(newArr[1], 0, [start = 0], [end = newArr[1].length]);


for (let i = 0; i < 4; i++) {
    console.log(newArr[i]);
}


//3
let unionArr = [2, 3, 3, 4, 5, 5, 6];

let unique = loadDash.uniq(unionArr);
console.log(unique);


//4
let obj1 = {
    a: 1,
    b: 2
}

let obj2 = {
    b: 3,
    c: 4
}

let objMerge;
objMerge = loadDash.merge(objMerge, [obj1], [obj2]);
console.log(objMerge);



//5

let people = [{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }, { name: 'Jim', age: 20 }];


people = loadDash.orderBy(people, [iteratees = 'age'], 'desc');
console.log(people);




