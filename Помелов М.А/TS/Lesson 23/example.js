"use strict";
// type Example<T> = {
//     [P in keyof T]: string
// }
let newUser;
let currentUserProfile = {
    id: 1,
    userName: 'string',
    mail: 'string',
    fullName: 'string',
    addres: 'string',
    phone: 66465
};
let upd = {
    fullName: 'stringSSSSSSSSSSSS',
    addres: 'stringSSSSSSSSSSSS'
};
function updateUserProfile(user, updateData) {
    return Object.assign(Object.assign({}, user), updateData);
}
let updatedUser = updateUserProfile(currentUserProfile, upd);
console.log(updatedUser);
