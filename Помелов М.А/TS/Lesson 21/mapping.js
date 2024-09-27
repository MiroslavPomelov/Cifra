"use strict";
// type Cat = {
//     name: string;
//     breed: string;
// }
function isBook(type) {
    return type !== undefined;
}
function gerProperty(type, name) {
    if (isBook(type)) {
        if (name in type) {
            return type;
        }
    }
}
let book = {
    title: 'aaaaaa',
    author: 'bbbbbb',
    yearPublished: '1999',
    available: true
};
console.log(gerProperty(book, "yearPublished"));
