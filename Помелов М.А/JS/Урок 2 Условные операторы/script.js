// if (условие) {
//     console.log();
// }
// else{

// }

// let number = 10;

// if (number % 2 == 0) {
//     console.log('Число четное');
// }

// let x = 2;
// let y = 7;

// if (x > 2) {
//     if (y > 5) {
//         console.log("x больше 2, а у больше 5");
//     }
//     else {
//         console.log("x больше 2, но у меньше 5");
//     }
// }
// else if (x < 2) {

// }
// else {
//     console.error('x равен 2');
// }

// === - сравнение напрямую


//1

// let number = prompt("Введите число: ");

// if (number % 2 == 0){
//     alert("Число четное")
// }
// else{
//     alert("Число нечетное")
// }




//2

// let date = prompt("Введите время от 0 до 23: ");

// if (date > 0 && date < 6) {
//     alert("Сейчас ночь")
// }
// else if (date > 6 && date <= 12) {
//     alert("Сейчас утро")
// }
// else if (date > 12 && date <= 18) {
//     alert("Сейчас день")
// }
// else if (date > 18 && date <= 22) {
//     alert("Сейчас вечер")
// }
// else{
//     alert("Сейчас ночь")
// }






//3

// let price = prompt("Введите сумму:");

// if (price > 100 && price <= 200) {
//     price = price * 0.1;
//     alert("Скидка составила 10% - " + price);
// }
// else if (price > 200 && price <= 300) {
//     price = price * 0.2;
//     alert("Скидка составила 20% - " + price);
// }
// else {
//     alert("Нет скидки");
// }

//4

// let age = prompt("Введите ваш возраст:");

// if (age < 14) {
//     alert("Вы ребенок");
// }
// else if(age > 14 && age <= 20) {
//     alert("Вы подросток");
// }
// else if(age > 20 && age <= 100) {
//     alert("Вы взрослый");
// }
// else{
//     alert("Вы слишком старый");
// }






// 5


// const password = '1q2w3e'

// let checkPassword = prompt("Введите ваш пароль:");

// if (password == checkPassword) {
//     alert("Пароль верный");
// }
// else{
//     alert("Пароль неверный");
// }


// 6


// let day =  prompt("Введите день от 1 до 7:");

// if (day) {

// }



//8

let foo = prompt("Введите ченить:");

if (foo == 'admin' || 'админ') {
    alert("Введите пароль");
    foo = prompt("Введите ченить:");
    
    if (foo == '2807988') {
        alert("Пароль верен");
    }
    else {
        alert("Пароль неверен");
    }
}
