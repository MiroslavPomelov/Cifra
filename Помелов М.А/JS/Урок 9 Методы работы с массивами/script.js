// let fruits = ['apple', 'banan', 'orange'];

// fruits.forEach(function (fruits, index) {
//     console.log(`Индекс: ${index} : ${fruits}`);
// });





// Изменение массива и возврат - map
// let numbers = [1, 4, 8, 12, 16];
// let quartes = numbers.map(
//     function (numbers) {
//         return numbers * numbers;
//     })

// console.log(numbers);
// console.log(quartes);





//Вернуть массив с условием - filter
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// let evenNumbers = numbers.filter(function (numbers) {
//     return numbers % 2 == 0;
// });

// console.log(numbers);
// console.log(evenNumbers);




//Подсчет элементов - reduce
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// let currentValue = numbers.reduce(function (accumulator, currentValue) {
//     if (currentValue % 2 == 0) {

//         return accumulator + currentValue;
//     }
//     return accumulator
// }, 0);

// console.log(currentValue);



// let minimalValue = numbers.reduce(function (accumulator, currentValue) {
//     return Math.min(accumulator, currentValue);
// });

// console.log(minimalValue);



//Возвращает bool - some/every
// let numbers = [1, 2, 3, -4, 5, 6, 7, 8];
// let fruits = [' apple', ' banan', ' Valery', ' orange'];

// let startsWithV = fruits.some(function (value) {
//     return value[0] == 'V';
// });

// console.log(startsWithV);


// let allStartsWithV = fruits.every(function(value){
//     return value[0] == ' ';
// });

// console.log(allStartsWithV);





//.pop() - удаляет последний элемент массива и возвращает его
//.push() - добавляет элемент в конец массива
//.unshift() - добавление в начало
//.shift() - удаление из начала
//.sort()- сортировка по возрастанию
//.reverse() - переворачивает
//.slice(нач элемент, по какой будем резать) - срез по массиву не изменяю его
//.splice(нача элемент, количесвто, (опционально замена)) - вырез с заменой
//.cuncat(newArr) - склейка двух массивов 
//.indexOf(value) - возвращает индекс первого вхождения value
//.lastIndexOf(value) - последнее вх.
//.includes(value) - возвращает boolean содержание элемента


let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newValue = numbers.find(element => element % 2 == 0);
console.log(newValue);