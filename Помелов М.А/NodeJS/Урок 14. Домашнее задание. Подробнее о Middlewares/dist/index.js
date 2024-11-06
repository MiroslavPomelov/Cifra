"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_operator_module_1 = require("./file-operator_module");
const User_1 = require("./User");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
let registratedUsers;
app.get('/registration-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../registration-page.html"));
}));
app.get('/enter-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../enter-page.html"));
}));
app.get('/index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../index.html"));
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.writeHead(301, { 'Location': '/enter-page' });
    res.end();
    // res.setHeader('Content-Type', 'text/html').status(200);
    // res.send(await readFilePromise("../enter-page.html"));
}));
app.post('/registration-page', checkRegisteredUsers, express_1.default.urlencoded({ extended: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let user = new User_1.User(req.body.user);
    registratedUsers.push(user);
    (0, file_operator_module_1.writeFilePromise)('../db/userData.json', JSON.stringify(registratedUsers, null, 2))
        .then(() => {
        return replaceTemplateValues(user);
    })
        .then((page) => __awaiter(void 0, void 0, void 0, function* () {
        res.set('Content-Type', 'text/html')
            .status(201)
            .send(yield (0, file_operator_module_1.readFilePromise)("../enter-page.html"));
    }));
}));
app.post('/login', validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(createTocken(64));
    // let user: User = new User(req.body.user);
    // res.set('Content-Type', 'text/html')
    //     .status(200)
    //     .send(await readFilePromise("../index.html"));
    // res.status(201).send({message: 'Успешная авторизация'});
    // res.status(201);
    // res.send(await readFilePromise("../index.html"));
    res.status(201);
    res.send({
        status: 201,
        message: 'ass'
    });
}));
app.listen(3000, () => {
    (0, file_operator_module_1.readFilePromise)('../db/userData.json')
        .then((data) => {
        registratedUsers = JSON.parse(data);
        console.log('Server running on port 3000');
    });
});
function createTocken(value) {
    const tockenString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let tocken = '';
    for (let i = 0; i < value; i++) {
        if (i % 9 === 0 && i != 0) {
            tocken += '-';
            continue;
        }
        tocken += tockenString[Math.floor(Math.random() * (61 - 0 + 1)) + 0];
    }
    return tocken;
}
function checkRegisteredUsers(req, res, next) {
    console.log(req.body);
    let user = new User_1.User(req.body.userPinegun);
    if (!req.body.user) {
        res.status(404).send('Ошибка запроса');
    }
    let findUserByEmail = registratedUsers.find(registratedUser => registratedUser.email === user.email);
    if (findUserByEmail) {
        res.status(401).send('Пользователь с таким email уже зарегистрирован');
        return;
    }
    next();
}
function validateUser(req, res, next) {
    console.log(req.body);
    let user = new User_1.User(req.body.user);
    console.log(user);
    if (!req.body.user) {
        res.status(400).send('Ошибка запроса');
    }
    let findUserByUsername = registratedUsers.find(registratedUser => registratedUser.username === user.username);
    if (findUserByUsername) {
        console.log('findUserByUsername');
        if (user.password === findUserByUsername.password) {
            req.body.user = findUserByUsername;
            next();
        }
        else {
            res.status(403).send({ message: 'Неправильный пароль!' });
            return;
        }
    }
    else {
        res.status(403).send({ message: 'Неправильный логин!' });
        return;
    }
}
function replaceTemplateValues(userData) {
    return new Promise((resolve, reject) => {
        (0, file_operator_module_1.readFilePromise)('../index.html')
            .then((data) => {
            data = data.replace('%username%', userData.username)
                .replace('%firstname%', userData.firstname)
                .replace('%lastname%', userData.lastname)
                .replace('%email%', userData.email)
                .replace('%password%', userData.password);
            resolve(data);
        });
    });
}
