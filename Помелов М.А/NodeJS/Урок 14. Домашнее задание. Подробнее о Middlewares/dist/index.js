"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fileSystem = __importStar(require("fs"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path_1.default.join('../dist/uploads/', authorizatedUser.username);
        fileSystem.mkdirSync(uploadPath, { recursive: true });
        // cb(null, '../dist/uploads/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fieldSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
function checkFileType(file, cb) {
    // Разрешенные типы файлов
    const filetypes = /jpeg|jpg|png|gif/;
    // Проверка расширения файла
    const extName = path_1.default.extname(file.originalname).toLowerCase();
    const extname = filetypes.test(extName);
    // Проверка mime-типа
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Ошибка: Только изображения!');
    }
}
app.engine("hbs", (0, express_handlebars_1.engine)({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path_1.default.join(__dirname, "../public/views/layouts"),
}));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "../public/views"));
let registratedUsers;
app.get("/registration-page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", "text/html").status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../registration-page.html"));
}));
app.get("/enter-page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", "text/html").status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../enter-page.html"));
}));
app.get("/index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", "text/html").status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../index.html"));
}));
//---------------------------------------
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.send('Файл успешно загружен!');
    }
    catch (err) {
        res.sendStatus(400);
    }
});
let authorizatedUser;
app.get("/", checkCookies, (req, res) => {
    console.log("11111");
    for (let i = 0; i < registratedUsers.length; i++) {
        if (req.cookies.token === registratedUsers[i].token) {
            authorizatedUser = registratedUsers[i];
        }
    }
    res.render("user", {
        username: authorizatedUser.username,
        firstname: authorizatedUser.firstname,
        lastname: authorizatedUser.lastname,
        email: authorizatedUser.email,
        password: authorizatedUser.password,
    });
});
app.post("/registration-page", checkRegisteredUsers, express_1.default.urlencoded({ extended: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let user = new User_1.User(req.body.user);
    registratedUsers.push(user);
    (0, file_operator_module_1.writeFilePromise)("../db/userData.json", JSON.stringify(registratedUsers, null, 2))
        .then(() => {
        return replaceTemplateValues(user);
    })
        .then((page) => __awaiter(void 0, void 0, void 0, function* () {
        res
            .set("Content-Type", "text/html")
            .status(201)
            .send(yield (0, file_operator_module_1.readFilePromise)("../enter-page.html"));
    }));
}));
app.post("/login", validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(createToken(64));
    res.status(201);
    res.send({
        status: 201,
        message: "ass",
    });
}));
app.listen(3000, () => {
    (0, file_operator_module_1.readFilePromise)("../db/userData.json").then((data) => {
        registratedUsers = JSON.parse(data);
        console.log("Server running on port 3000");
    });
});
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
function checkCookies(req, res, next) {
    let token = req.cookies.token;
    console.log(token);
    if (token != undefined) {
        for (let i = 0; i < registratedUsers.length; i++) {
            if (registratedUsers[i].token == token) {
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
    let findUserByEmail = registratedUsers.find((registratedUser) => registratedUser.email === user.email);
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
    let foundUser = registratedUsers.find((registratedUser) => registratedUser.username === user.username);
    if (foundUser) {
        console.log("findUserByUsername");
        if (user.password === foundUser.password) {
            // req.body.user = findUserByUsername;
            let token = createToken(256);
            foundUser.token = token;
            (0, file_operator_module_1.writeFilePromise)("../db/userData.json", JSON.stringify(registratedUsers, null, 2)).then((data) => {
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
function replaceTemplateValues(userData) {
    return new Promise((resolve, reject) => {
        (0, file_operator_module_1.readFilePromise)("../index.html").then((data) => {
            data = data
                .replace("%username%", userData.username)
                .replace("%firstname%", userData.firstname)
                .replace("%lastname%", userData.lastname)
                .replace("%email%", userData.email)
                .replace("%password%", userData.password);
            resolve(data);
        });
    });
}
