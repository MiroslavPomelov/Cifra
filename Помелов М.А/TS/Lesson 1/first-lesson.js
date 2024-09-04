"use strict";
// Логический тип
let isAvailable = true;
let isComplete = false;
console.log(isAvailable);
// Числовой тип
let temperature = 23.5;
let count = 5;
let decimal = 255;
let hex = 0xff;
let binary = 0b11111111;
// Строковый тип
let myName = 'Имя';
let city = 'Калинград';
let info = `Город ${city}`;
// Тип больших чисел
let largeNumber1 = BigInt(1124124331231231312312312312);
let largeNumber2 = 1124124331231231312312312312n;
// Любой тип данных
let dynamicValue = true;
// Неизвестный тип
let uncerainValue = 'asdasd';
if (typeof uncerainValue === 'string') {
    console.log(uncerainValue.toLocaleUpperCase);
}
else if (typeof uncerainValue === 'number') {
    console.log(uncerainValue + 50);
}
// Ничего не возращающий тип
function logMessage() {
    console.log('Hello');
}
// Типы null и undefiend
let nullable = null;
let undefiend = undefined;
// Тип который Никогда не возвращает значения
function example() {
    while (true) {
        throw new Error();
    }
}
// Коллекции
// Массив
let numberArray = [1, 2, 3, 4, 5];
let stringArray = ['aaaaaaa', 'sdasd', 'ssssssss', '1asdasd'];
// Кортеж
let tuple = ['word', 24];
// Множества
let uniqueData = new Set([1, 2, 3, 4, 5]);
// Словари
let dictionary = new Map();
dictionary.set('first', 1);
dictionary.set('second', 1);
