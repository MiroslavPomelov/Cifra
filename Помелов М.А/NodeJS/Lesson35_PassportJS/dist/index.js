"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const users = [
    { id: 1, username: 'User1', password: 'qwerty' },
    { id: 1, username: 'User2', password: 'asdfgh' }
];
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    const user = users.find(u => u.username === username
        && u.password === password);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false, { message: 'Неверное имя пользователя или пароль!' });
    }
}));
passport_1.default.serializeUser((user, done) => { done(null, user.id); });
passport_1.default.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(user, user || null);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Настройки сессии Авангардный мидлвэр
app.use((0, express_session_1.default)({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
}));
//Вкл паспорт
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
// Защищенный маршрут
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome!');
    }
    else {
        res.redirect('/login');
    }
});
app.get('reg', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to reg!');
    }
    else {
        res.redirect('/login');
    }
});
app.listen(3000, () => {
    console.log('hello');
});
