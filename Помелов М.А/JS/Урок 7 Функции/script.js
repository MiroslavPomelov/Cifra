// function greet(message) {
//     console.log(message);
// }


// greet('Hello');


// let funk = function(){
//     console.log('Do something');
// }

// greet();
// funk();

// let unusualFunk = (name) => {
//     console.log("Priv - " + name);
// }

// unusualFunk();


// function calculator(first, second, operator) {
//     switch (operator) {
//         case 1:
//             console.log(first + second);
//             break;
//         case 2:
//             console.log(first - second);
//             break;
//         case 3:
//             console.log(first / second);
//             break;
//         case 4:
//             console.log(first * second);
//             break;

//         default:
//             console.log('Ошибка');
//             break;
//     }


//     calculator(10, 20, 1);
// }


// let arr = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12]
// ];

// let getOneDimArraySum = (oneDimArr) => {
//     let sum = 0;
//     for (let i = 0; i < oneDimArr.length; i++) {
//         sum += oneDimArr[i];
//     }
//     return sum;
// }

// let getTwoDimArrySum = (twoDimArr) => {
//     let sum = 0;
//     for (let i = 0; i < twoDimArr.length; i++) {
//         sum += getOneDimArraySum(arr[i]);
//     }
//     return sum;
// }

// console.log(getTwoDimArrySum(arr));








//2

// let getEvenNumber = function (number) {
//     if (number % 2 == 0) {
//         console.log("Четное число");
//     }
//     else{
//         console.log("Нечетное число");
//     }
// }

// getEvenNumber(2);








//3

// let greetWithUser = (name) =>{
//     console.log('Привет '+  name);
// }

// greetWithUser("Miroslav");


//4

// function getRanomNumber(first, two) {

//     let random = Math.round((Math.random() * (two - first)+first));
//     console.log(random);
// }

// getRanomNumber(-100, 500);







//5
// let getSymbols = function(word){
//     let sum = 0;
//     for (let i = 0; i < word.length; i++) {
//         sum++;
        
//     }
//     console.log(sum);
// }

// getSymbols("asdddd");





//6

// let checlPolidrom = (word) =>{
//     let flag = false;
//     for (let i = 0; i < word.length; i++) {
//         if (word[i]!= word[word.length-i]) {
//             flag = true;
//             break;
//         }   
//     }
//     console.log(flag);
// } 
// checlPolidrom("radars")
