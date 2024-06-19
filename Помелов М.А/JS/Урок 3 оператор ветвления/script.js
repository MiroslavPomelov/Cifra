// Math

// let number = 16; 
// let result = Math.sqrt(number);
// console.log(result);


// let result = Math.abs(-5);
// console.log(result);



// Округление вверх
// let result = Math.ceil(-5); 
// console.log(result);

// Округление вниз
// let result = Math.floor(4.8);
// console.log(result);

// Округление в большую сторону
// let result = Math.round(4.5);
// console.log(result);




// Найти макс число
// let result = Math.max(4, 12,4,0);
// console.log(result);

// let result = Math.min(4, 12,4,0);
// console.log(result);



// Возведение в квадрат
// let result = Math.pow(5,2);
// console.log(result);

// Извель куб
// let result = Math.cbrt(25);
// console.log(result);




// Генерация чисел
// let result = Math.round(Math.random() * 10);
// console.log(result);



// let result = Math.PI;
// console.log(result);



















// Vetvelenie
// let number = 50;

// switch (number) {
//     case 10:
//         console.log("Число ровно 10");
//         break;
//     case 20:
//         console.log("Число ровно 20");
//         break;
//     case 50:
//         console.log("Число ровно 50");
//         break;
//     default:
//         console.log("нет");
//         break;
// }


// let day = 3;

// switch (day) {
//     case 1:
//         console.log("Понедельник");
//         break;
//     case 2:
//         console.log("Вторник");
//         break;
//     case 3:
//         console.log("Среда");
//         break;
//     case 4:
//         console.log("Четверг");
//         break;
//     case 5:
//         console.log("Пятгица");
//         break;
//     case 6:
//         console.log("Суббота");
//         break;
//     case 7:
//         console.log("Воскресенье");
//         break;
//     default:
//         console.log("Неизвестный день");
//         break;
// }



// Считать угол
// let angleInRadians = Math.PI / 2;
// let sinValue = Math.sin(angleInRadians);
// console.log("Синус угла 90 градусов: " + sinValue);

// let secondAngleInRadians = Math.PI / 3;
// let cosValue = Math.cos(secondAngleInRadians);
// console.log("Косинус угла 60 градусов: " + cosValue);



// Конвертации типов
// let number = 123;
// let str = String(number);

// console.log(typeof str);




// let newStr = '123';
// let stredNumber = Number(newStr);
// console.log(typeof stredNumber);



// let initialValue = '0';
// let trueBool = Boolean(initialValue);
// let falseBool = Boolean('');

// console.log(trueBool);
// console.log(falseBool);



// let firstNumber = Number(prompt("Введите первое число: "));
// let secondNumber = Number(prompt("Введите второе число: "));
// let operator = Number(prompt("Введите оператор: [1] Сложение \n [2] Вычитание \n  [3] Деление \n [4] Умножение \n [5] Возведение в степень \n"));

// switch (operator) {
//     case 1:
//         alert( firstNumber + secondNumber);
//         break;
//     case 2:
//         alert(firstNumber - secondNumber);
//         break;
//     case 3:
//         alert(firstNumber / secondNumber);
//         break;
//     case 4:
//         alert(firstNumber * secondNumber);
//         break;
//     case 5:
//         alert(Math.pow(firstNumber, secondNumber));
//         break;
//     default:
//         alert('Нет значения!');
//         break;
// }


let sum = Number(prompt("Введите сумму в рублях: "));
let value = Number(prompt("Введите валюту: [1] доллар \n [2] евро \n  [3] тенге "));

const dollar = 90;
const euro = 100;
const tenge = 0.18;

switch (value) {
    case 1:
        alert((sum / dollar).toFixed(2) + ' dollars');
        break;
    case 2:
        alert((sum / euro).toFixed(2));
        break;
    case 3:
        alert((sum * tenge.toFixed(2)));
        break;
    default:
        alert('Нет значения!');
        break;
}