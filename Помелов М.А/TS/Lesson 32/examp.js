// Регулярные выражения

// const regex = /hello/i; //hello - паттерн, i - регистрозависимы поиск
// console.log(regex.test('Hello, world!'));





//!!!!!!!!!!!!!!!!!!!!!!!
// const pattern = 'Hello';
// const flag = 'i';

// const regex = new RegExp(pattern, flag);
// console.log(regex.test('Hello, world!'));
// console.log(regex.test('Hi!'));





// const regex = /friend/i;
// const result = regex.exec('Hello, my dear friend');

// console.log(result);





// const str = 'asdasd hello world!';
// const regex = /hello/i;
// const matches = str.match(regex);
// console.log(matches);


// ЗАМЕНА СЛОВА
// const str = 'hello world!';
// const regex = /hello/i;
// const newStr = str.replace(regex, 'hi');
// console.log(newStr); 













/*
СИМВОЛЫ
\. - любой одиночный символ кроме новой строки
\d - люая цифра [0 - 9]
\D - любой символ кроме цифры
\w - любой алфавитно цифровой символ
\W - любой символ кроме алфавитно цифрового
\s - любой пробельный символ
\S - любой символ кроме пробельного

КВАНТИФИКАТОРЫ
* - 0 или более вхождений
+ - 1 или более вхождений
? - 0 или 1 вхождение
{n} - конкретное число вхождений, где n количество
{n,} - количесвто вхождений от n и более
{n,m} - количество вхождений от n до m

ЯКОРЯ
^ - начало строки
$ - конец строки
\b - граница слово
\B - не граница слова

ГРУППИРОВКА И АЛЬТЕРНАТИВЫ
() - группировка
| - альтернатива (как логическое ИЛИ)
*/


// str = 'aaaa aaaa aaaa          aaaa      aaaa   aaaa';
// const regex = /\s+/;
// const parts = str.split(regex);
// console.log(parts);


// const companyName = 'Valeriy & Anataliy Co';
// const regex = /\s\W\s/;
// const parts = companyName.split(regex);
// console.log(parts);


// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// console.log(emailRegex.test('example@mail.ru'));
// console.log(emailRegex.test('example.com'));


// const text = 'Hello world, this is a test';
// const words = text.match(/\b\w+\b/g);
// console.log(words);



// const text = ' Мой номер телефона 123-456-7890';
// const newText = text.replace(/\d/g, '#');
// console.log(newText);


const regex = /\u{263A}/u;
console.log(regex.test("\U+263A"));









