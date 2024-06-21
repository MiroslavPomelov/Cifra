// Create
// let oneDimArr = [1, 2, 3, 4, 5];

// let manyDimArrSimple = [
//     [1, 2, 3],
//     [1, 2, 2],
//     [1, 2, 1]
// ]

// let emptyManyDirArr = [
//     [[], [], []],
//     [],
//     []
// ]

let alternativeManyDimArr = Array(
    Array(Array(1, 2, 3), Array(1, 2, 3), Array(1, 2, 3)),
    Array(Array(1, 2, 3), Array(1, 2, 3), Array(1, 2, 3)),
    Array(Array(1, 2, 3), Array(1, 2, 3), Array(1, 2, 3)),
);

// let value = alternativeManyDimArr[1][2][1];
// console.log(value);

// let sum = 0;

// for (let i = 0; i < alternativeManyDimArr.length; i++) {
//     for (let j = 0; j < alternativeManyDimArr[i].length; j++) {
//         for (let k = 0; k < alternativeManyDimArr[i][j].length; k++) {
//             sum += alternativeManyDimArr[i][j][k];
//         }
//     }
// }

// console.log(sum);


//2

// let firstArr = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
// ]

// let secondtArr = [
//     [9, 8, 7],
//     [6, 5, 4],
//     [3, 2, 1],
// ]

// let thirdArr = [];

// let sum = 0;

// for (let i = 0; i < firstArr.length; i++) {
//     thirdArr.push([])
//     for (let j = 0; j < firstArr[i].length; j++) {
//         thirdArr[i].push(firstArr[i][j] + secondtArr[i][j]);
//     }
// }

// console.log(thirdArr);



//3

// let number = prompt('Введите число: ');

// let matrix = [
//     [-4, 7, -9, 3, 10],
//     [5, -2, 8, -6, 11],
//     [-8, 0, -4, -5, 9],
//     [2, -3, 6, -7, -10]
// ]

// for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//         matrix[i][j] = matrix[i][j] * number;
//     }

// }
// console.log(matrix);

//4

let sum = 0;


let matrix = [
    [-4, 7, -9, 3, 10],
    [5, -2, 8, -6, 11],
    [-8, 0, -4, -5, 9],
    [2, -3, 6, -7, -10]
]

for (let i = 0; i < matrix.length; i++) {

    sum += matrix[i][number];


}
console.log(sum);