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
exports.registratedUsers = void 0;
const express_1 = __importDefault(require("express"));
const file_operator_module_1 = require("./file-operator_module");
const User_1 = require("./User");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fileSystem = __importStar(require("fs"));
const middlewares = __importStar(require("./services/middlewares"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '../public/views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../public/views'));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let findUser = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
        if (!findUser)
            return;
        const uploadPath = path_1.default.join('../dist/uploads/', findUser.username);
        fileSystem.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000000 },
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
;
// Вынести в отдельную папку (SHARED) и модуль. 
function replaceTemplateValues(userData) {
    return new Promise((resolve, reject) => {
        (0, file_operator_module_1.readFilePromise)('../webApp/index.html')
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
app.get('/registration-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('загрузка регистрации');
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../webApp/registration-page.html"));
}));
app.get('/', middlewares.checkCookies, (req, res) => {
    for (let i = 0; i < exports.registratedUsers.length; i++) {
        if (req.cookies.token === exports.registratedUsers[i].token) {
            res.render('user', { user: exports.registratedUsers[i] });
            return;
        }
    }
});
app.post('/upload', middlewares.checkCookies, upload.single('file'), (req, res) => {
    var _a;
    console.log('enter');
    if (!req.file) {
        res.status(400).send('No file uploaded.');
    }
    else {
        const fileName = req.file.filename;
        let findUser = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
        if (findUser) {
            (_a = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token)) === null || _a === void 0 ? void 0 : _a.listOfFiles.push({ name: fileName });
            (0, file_operator_module_1.writeFilePromise)('../db/userData.json', JSON.stringify(exports.registratedUsers, null, 2));
            res.status(201).send({
                status: 201,
                message: 'файл успешно загружен'
            });
        }
        else {
            res.send({
                status: 200,
                message: 'не удалось загрузить файл'
            });
        }
    }
});
app.get('/enter-page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../webApp/enter-page.html"));
}));
app.post('/registration-page', middlewares.checkRegisteredUsers, express_1.default.urlencoded({ extended: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new User_1.User(req.body.user);
    exports.registratedUsers.push(user);
    (0, file_operator_module_1.writeFilePromise)('../db/userData.json', JSON.stringify(exports.registratedUsers, null, 2))
        .then(() => {
        return replaceTemplateValues(user);
    })
        .then((page) => __awaiter(void 0, void 0, void 0, function* () {
        res.set('Content-Type', 'text/html')
            .status(201)
            .send(yield (0, file_operator_module_1.readFilePromise)("../webApp/enter-page.html"));
    }));
}));
app.post('/login', middlewares.validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(201).send({
        status: 201,
        message: 'success'
    });
}));
app.get('/index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_module_1.readFilePromise)("../webApp/index.html"));
}));
app.get('/documents', middlewares.checkCookies, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies.token);
    let findUser = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
    if (findUser) {
        let files = findUser.listOfFiles;
        res.render('avaliableFiles', { files });
    }
    else {
        res.end('Ошибка!');
    }
}));
app.get('/download', middlewares.checkCookies, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let findUser = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
    const fileName = req.query.name;
    if (findUser) {
        res.header('Content-Disposition', 'attachment');
        res.status(200).sendFile(path_1.default.join(__dirname, `../dist/uploads/${findUser.username}/${fileName}`), function (err) {
            if (err) {
                console.error('Ошибка при загрузке файла:', err);
            }
            else {
                console.log('Загружен:', fileName);
            }
        });
    }
    else {
        res.end('Ошибка!');
    }
}));
app.get('/exit', middlewares.checkCookies, (req, res) => {
    let findUser = exports.registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
    if (findUser) {
        findUser.token = null;
        res.writeHead(302, { 'Location': '/enter-page' });
        res.end();
    }
    else {
        res.end('Ошибка!');
    }
});
app.listen(3000, () => {
    (0, file_operator_module_1.readFilePromise)('../db/userData.json')
        .then((data) => {
        exports.registratedUsers = JSON.parse(data);
        console.log('Server running on port 3000');
    });
});
