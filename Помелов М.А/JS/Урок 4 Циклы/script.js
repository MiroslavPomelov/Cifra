

// for (начальное значение, условие продолжения, шаг) {
//     Блок кода на каждой итерации
// }


// Пример кода for
// for (let i = 0; i < 5; i++) {
//     console.log('Значение переменной ' + i)
// }

// Цикл while
// let counter = 10;

// while (counter > 0) {
//     console.log(counter);

//     counter--;
// }

// Цикл do while
// let counter = 10;

// do {
//     console.log('Цикл работает');
//     counter--;
// }
// while (counter > 0);


//1
// let sum = 0;
// let number = Number(prompt("Введите число: "));

// for (let i = 1; i < number + 1; i++) {
//     sum += i;
// }

// console.log('Сумма чисел от 1 до ' + number + 'равна ' + sum);

//2
// let number = Number(prompt("Введите число: "));
// let counter = 1;

// while (counter <= 10) {
//     console.log(counter + '\t'+ 'х'+ number + ' = '+ number*counter)
//     counter++;
// }


//3
// let  bool= true;
// let number = Number(prompt("Введите число: "));

// for (let i = 2; i != number-1; i++) {
//     if (number % i == 0 ) {
//         console.log("НеПростое число");
//         bool = false;
//         break;
//     }

// }
// if (bool) {
//     console.log("простое число");
// }


//5


    
    let number = Number(prompt("Угадайте число: "));
    
    let random = Math.ceil(Math.round((Math.random() * 10)/3));

    console.log(random);

    if (random !=0 ) {
    
        console.log('Вы угадали!');
    }
    else {
        console.log('Попробуйте еще раз!');
    }



