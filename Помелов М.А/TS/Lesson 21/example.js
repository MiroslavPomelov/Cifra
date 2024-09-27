"use strict";
// type Person = {
//     name: string;
//     age: number;
//     address: {
//         street: string;
//         city: string;
//     }
// }
function printPersonInfo(person) {
    if ('privilages' in person) {
        console.log(` ${person.privilages.join(', ')}`);
    }
    if ('email' in person) {
        console.log(`${person.email}`);
    }
}
let admin = {
    name: 'ASdasd',
    privilages: ["asd", 'dsad']
};
let user = {
    name: 'ASdasssssssssd',
    email: "dasdasdas"
};
printPersonInfo(admin);
printPersonInfo(user);
