// Создание переменных
var number = 10; // Устревший оператор
const caonstantNumber = 50; // Константа без изменений
let value = 34; // Универсальный способ

let word = 'слово "slovo"'; // Инициализация переменной
word = 'Другая компания'  // Переопределение переменной

// const constWord = 'Hello';
// constWord = 'asdasd'

let x = 5;
let y = 12;
let sum = x + y;
let substract = x - y;
let multiplication = x * y;
let divide = x / y;
let reminder = x % y;

// Инкремент
x++;
// Декремент
y--;

// Типы данных в JS
let typeNumber = 10;
let typeString = 'Word';
let typeBooleanr = true;

// 4. Необъявленный Хранит undefined
let undef;
// 5. Символы
let symbol = Symbol('C');
// 6. Объект
let object = {
    key: "value",
    name: "Имя",
    age: 34
}
// 7.Функция
function foo() {
    console.log("Я функция");
}

//8. Массив
let arr = [1, 2, "Привет", true, object, () => { console.log("hello") }];

//9. Многомерный массив
let doubleDimArr = [
    [1, 2, 3],
    ["Hellow world"],
    [[
        [
            [1]
        ]
    ]]
]

//10. Встроенные типы
let date = new Date();
let random = Math.random();




console.log(sum);
console.log(substract);
console.log(multiplication);
console.log(divide);
