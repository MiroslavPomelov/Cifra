// Создание массива 1
// let numbers = [1, 2, 3, 4, 5, 6];


// 2
// let classedArray = new Array('red', 'green', 'blue');




// Способы получения элемента по индексу
// let value = numbers[0];
// console.log(value);





// Способы получения длины массива
// let arrLength = classedArray.length;




// Способы изменения значений элементов в массиве
// numbers[3] = 'hello';
// console.log(numbers[3]);







// Встроенные функции для управления массивами

// Добавления/удаление элементов в конец массива
// classedArray.push(80);

// let lastValue = classedArray.pop();



// Добавление/удаление элемента в начало массива
// classedArray.unshift('purple');
// console.log(classedArray);

// classedArray.shift();
// console.log(classedArray);




// Вырезать элементы с массива 1-индекс, 3- скольк. последующие значения заменяются удаленными.
// let numbers = [1, 2, 3, 4, 5, 6];

// let values = numbers.splice(1, 3);
// console.log(values);
// console.log(numbers);

// Cрез массива 1- начало не вкл. 3- конец включительно.
// let arraySlice = numbers.slice(1,3);
// console.log(arraySlice);
// console.log(numbers);

// for (let i = 0; i < numbers.length; i++) {
//     console.log(numbers[i]);
// }




// let fruits = ['apple', 'waterlemom', 'lemon', 'grape', 'plum'];
// let counter = 0;

// while (counter != fruits.length) {
//     console.log("Номер элемента " + counter + " Значение - " + fruits[counter]);
//     counter++;
// }





//1
// let numbers = [2, 4, 6, 8, 10];
// let result = 0;

// for (let i = 0; i < numbers.length; i++) {
//     result += numbers[i]
// }
// console.log(result);


//2 
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let result = 0;

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 == 0) {

//         result ++;
//     }
// }
// console.log(result);

//3
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let input = prompt('Введите индекс: ');

// for (let i = 0; i < numbers.length; i++) {
//     if (input == numbers[i]) {
//         console.log(i);
//     }

// }

//4
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// for (let i = 0; i <= numbers.length; i++) {
//     console.log(numbers[numbers.length - 1 - i]); 
// }


//5
let people = [
    {
        name: "Slava",
        surname: "surname",
        age: 34
    },
    {
        name: "Nikolay",
        surname: "surname",
        age: 35
    },
    {
        name: "Alexandr",
        surname: "surname",
        age: 36
    },
    {
        name: "Alex",
        surname: "surname",
        age: 37
    },
    {
        name: "Misha",
        surname: "surname",
        age: 38
    },
    {
        name: "Boris",
        surname: "surname",
        age: 39
    },
    {
        name: "Ivan",
        surname: "surname",
        age: 40
    },
    {
        name: "Dmitiy",
        surname: "surname",
        age: 41
    },
    {
        name: "Sergey",
        surname: "surname",
        age: 42
    },
    {
        name: "Bogdan",
        surname: "surname",
        age: 43
    }
];

let ages = [];

for (let i = 0; i < people.length; i++) {
    if (people[i].age % 2 == 0) {
        ages.push(people[i].age);
    }
}

for (let i = 0; i < ages.length; i++) {
    console.log(ages[i]);
}

