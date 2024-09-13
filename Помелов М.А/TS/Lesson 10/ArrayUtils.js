"use strict";
// class ArrayUtils {
//     static sort(array: Array<number>): Array<number> {
//         if (!array) {
//             throw new Error();
//         }console.log(`arr\n${array}`);
//         console.log(array.sort());
//         return array.sort();
//     }
//     static minValue(array: Array<number>): number {
//         array.sort();
//         return array[0];
//     }
//     static maxValue(array: Array<number>): number {
//         array.sort();
//         return array[array.length - 1];
//     }
//     static averageValue(array: Array<number>): number {
//         let result = 0;
//         for (let i = 0; i < array.length; i++) {
//             result += array[i];
//         }
//         return result / array.length;
//     }
//     static filterArray(array: Array<number>, conditionValue: number): Array<number> {
//         let filterArray: Array<number> = [];
//         for (let i = 0; i < array.length; i++) {
//             if (conditionValue === array[i]) {
//                 filterArray.push(array[i]);
//             }
//         }
//         return filterArray;
//     }
//     static deleteDoubles(array: Array<number>): Array<number> {
//         const newArray: Array<number> = array;
//         const filterArray = new Set(newArray);
//         return Array.from(filterArray);
//     }
// }
// console.log(ArrayUtils.sort(array));
// console.log(ArrayUtils.minValue(array));
// console.log(ArrayUtils.maxValue(array));
// console.log(ArrayUtils.averageValue(array));
// console.log(ArrayUtils.deleteDoubles(array));
let array22 = new Array(1, 4, 2, 3, 4, 10, 35, 22);
console.log(array22.sort((a, b) => a - b));
