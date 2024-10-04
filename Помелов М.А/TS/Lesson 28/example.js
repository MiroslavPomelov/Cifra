"use strict";
// yield
// let iterable: number[] = [10, 20, 30];
// let iterator: Iterator<number> = iterable[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// function* simpleGenerator(): Generator<number, void, unknown> {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// let gen: Generator<number, void, unknown> = simpleGenerator();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// function* countDown(start: number): Generator<number, void, unknown> {
//     while (start > 0) {
//         yield start;
//         start--;
//     }
// }
// let counter: Generator<number, void, unknown> = countDown(5);
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// console.log(counter.next());
// function* countDown(start: number): Generator<number[], void, unknown> {
//     while (start > 0) {
//         yield [1,2,3,4,5];
//         yield [10,20,30,40,50];
//         yield [100,2,3,4,5];
//         yield [1000,2000,30000,4,5];
//     }
// }
// function* infinitySequence(): Generator<number, void, unknown> {
//     let i = 0;
//     while (true) {
//         yield i++;
//     }
// }
function* fetchData() {
    const data1 = yield fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json()).then(data => console.log(data));
    console.log(data1);
    const data2 = yield fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => console.log(data));
    console.log(data2);
}
let fethcer = fetchData();
fethcer.next();
console.log("-----------------------------------------------------------------");
fethcer.next();
