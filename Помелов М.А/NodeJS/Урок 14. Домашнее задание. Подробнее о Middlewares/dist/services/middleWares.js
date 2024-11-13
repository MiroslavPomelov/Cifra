"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCookies = checkCookies;
exports.checkRegisteredUsers = checkRegisteredUsers;
exports.validateUser = validateUser;
const index_1 = require("../index");
const file_operator_module_1 = require("../file-operator_module");
const User_1 = require("../User");
function checkCookies(req, res, next) {
    let token = req.cookies.token;
    console.log(token);
    if (token != undefined) {
        for (let i = 0; i < index_1.registratedUsers.length; i++) {
            if (index_1.registratedUsers[i].token == token) {
                console.log("Кукис чекед");
                next();
                return;
            }
        }
    }
    console.log("плохо");
    res.writeHead(302, { Location: "/enter-page" });
    res.end();
}
function checkRegisteredUsers(req, res, next) {
    console.log(req.body);
    let user = new User_1.User(req.body.userPinegun);
    if (!req.body.user) {
        res.status(404).send("Ошибка запроса");
    }
    let findUserByEmail = index_1.registratedUsers.find((registratedUser) => registratedUser.email === user.email);
    if (findUserByEmail) {
        res.status(401).send("Пользователь с таким email уже зарегистрирован");
        return;
    }
    next();
}
function validateUser(req, res, next) {
    console.log(req.body);
    let user = new User_1.User(req.body.user);
    console.log(user);
    if (!req.body.user) {
        res.status(400).send("Ошибка запроса");
    }
    let foundUser = index_1.registratedUsers.find((registratedUser) => registratedUser.username === user.username);
    if (foundUser) {
        console.log("findUserByUsername");
        if (user.password === foundUser.password) {
            // req.body.user = findUserByUsername;
            let token = createToken(256);
            foundUser.token = token;
            (0, file_operator_module_1.writeFilePromise)("../db/userData.json", JSON.stringify(index_1.registratedUsers, null, 2)).then((data) => {
                console.log(data);
            });
            res.cookie("token", token, { httpOnly: true });
            next();
        }
        else {
            res.status(403).send({ message: "Неправильный пароль!" });
            return;
        }
    }
    else {
        res.status(403).send({ message: "Неправильный логин!" });
        return;
    }
}
function createToken(value) {
    const tockenString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let tocken = "";
    let counter = 0;
    for (let i = 0; i < value; i++) {
        if (counter === 8) {
            tocken += "-";
            counter = 0;
            continue;
        }
        tocken += tockenString[Math.floor(Math.random() * (61 - 0 + 1)) + 0];
        counter++;
    }
    return tocken;
}
module.exports = {
    checkCookies: checkCookies,
    checkRegisteredUsers: checkRegisteredUsers,
    validateUser: validateUser
};
