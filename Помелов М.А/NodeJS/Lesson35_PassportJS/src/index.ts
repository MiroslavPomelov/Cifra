import express, { Express, Request, Response, NextFunction, urlencoded } from "express";
import session from 'express-session';
import { json } from "node:stream/consumers";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

interface User extends Express.User {
    id: number,
    username: string,
    password: string,
}

const users: User[] = [
    { id: 1, username: 'User1', password: 'qwerty' },
    { id: 1, username: 'User2', password: 'asdfgh' }
];


passport.use(new LocalStrategy(
    function (username: string, password: string, done: (error: any, user?: any, options?: { message: string }) => void) {
        const user: User | undefined = users.find(u => u.username === username
            && u.password === password);

        if (user) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Неверное имя пользователя или пароль!' })
        }
    }
));



passport.serializeUser((user: Express.User | User, done) => { done(null, (user as User).id) });

passport.deserializeUser((id: number, done) => {
    const user: User | undefined = users.find(u => u.id === id);
    done(user, user || null);
});





const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройки сессии Авангардный мидлвэр
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
}));

//Вкл паспорт
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));


// Защищенный маршрут
app.get('/', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.send('Welcome!')
    } else {
        res.redirect('/login');
    }
});

app.get('reg', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to reg!')
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, () => {
    console.log('hello');
});
