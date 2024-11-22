import express, { Request, Response, NextFunction } from 'express';
import { registratedUsers } from '../index';
import { readFilePromise } from '../file-operator_module';
import { writeFilePromise } from '../file-operator_module';
import { User } from '../User';

export function checkCookies(req: Request, res: Response, next: NextFunction) {
    let token: string | undefined = req.cookies.token;
    console.log(token)
    if (token != undefined) {
        for (let i = 0; i < registratedUsers.length; i++) {
            if (registratedUsers[i].token == token) {
                console.log('Кукис чекед')                
                next();
                return;
            }
        }
    }
    console.log('плохо')
    res.writeHead(302, { 'Location': '/enter-page' });
    res.end();
}

export function checkRegisteredUsers(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    let user: User = new User(req.body.user);

    if (!req.body.user) {
        res.status(404).send('Ошибка запроса')
    }

    let findUserByEmail = registratedUsers.find(registratedUser => registratedUser.email === user.email)

    if (findUserByEmail) {
        res.status(401).send('Пользователь с таким email уже зарегистрирован');
        return;
    }
    next();
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
    let user: User = new User(req.body.user);

    if (!req.body.user) {
        res.status(400).send({ message: 'Ошибка запроса' })
    }
    let foundUser = registratedUsers.find(registratedUser => registratedUser.username === user.username);

    if (foundUser) {
        if (user.password === foundUser.password) {
            let token: string = createToken(256);
            foundUser.token = token;
            writeFilePromise('../db/userData.json', JSON.stringify(registratedUsers, null, 2))
                .then((data: string) => {
                    console.log(data);
                });


            res.cookie('token', token, { httpOnly: true })
            console.log('Валидация пройдена')
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

function createToken(value: number): string {
    const tockenString: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let token: string = '';
    let counter: number = 0;
    for (let i = 0; i < value; i++) {
        if (counter === 8) {
            token += '-';
            counter = 0;
            continue;
        }

        token += tockenString[Math.floor(Math.random() * (61 - 0 + 1)) + 0];
        counter++;

    }
    return token;
}

module.exports = {
    checkCookies : checkCookies,
    checkRegisteredUsers : checkRegisteredUsers,
    validateUser : validateUser
}