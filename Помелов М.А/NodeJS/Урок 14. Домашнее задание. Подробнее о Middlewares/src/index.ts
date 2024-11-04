import express, { Request, Response, NextFunction } from 'express';
import { readFilePromise, writeFilePromise } from './file-operator_module'
import { User } from './User'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let registratedUsers: User[];

function checkRegisteredUsers(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    let user: User = new User(req.body.userPinegun);

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

function checkAuthorizatedUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    let user: User = new User(req.body.user);

    console.log(user);
    if (!req.body.user) {
        res.status(400).send('Ошибка запроса')
    }

    let findUserByUsername = registratedUsers.find(registratedUser => registratedUser.username === user.username);

    if (findUserByUsername) {
        console.log('findUserByUsername');
        if (user.password === findUserByUsername.password) {
            req.body.user = findUserByUsername;
            next();
        }
        else {
            res.status(403).send({message:'Неправильный пароль!'});
            return;
        }
    }
    else {
        res.status(403).send({message:'Неправильный логин!'});
        return;
    }
}

function replaceTemplateValues(userData: User): Promise<string> {
    return new Promise((resolve, reject) => {
        readFilePromise('../index.html')
            .then((data: string) => {
                data = data.replace('%username%', userData.username)
                    .replace('%firstname%', userData.firstname)
                    .replace('%lastname%', userData.lastname)
                    .replace('%email%', userData.email)
                    .replace('%password%', userData.password)
                resolve(data);
            });
    });
}

app.get('/registration-page', async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);

    res.send(await readFilePromise("../registration-page.html"));
});

app.get('/', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html').status(200);
    res.send(await readFilePromise("../enter-page.html"));
});


app.post('/registration-page', checkRegisteredUsers, express.urlencoded({ extended: true }), async (req: Request, res: Response) => {
    console.log(req.body)
    let user: User = new User(req.body.user);
    registratedUsers.push(user);

    writeFilePromise('../db/userData.json', JSON.stringify(registratedUsers, null, 2))
        .then(() => {
            return replaceTemplateValues(user);
        })
        .then(async (page) => {
            res.set('Content-Type', 'text/html')
                .status(201)
                .send(await readFilePromise("../enter-page.html"));
        })
});


app.post('/login', checkAuthorizatedUser, async (req: Request, res: Response) => {
    // console.log('dasd');
    // let user: User = new User(req.body.user);
    // res.set('Content-Type', 'text/html')
    //     .status(200)
    //     .send(await readFilePromise("../index.html"));
    res.status(201).send({message: 'Успешная авторизация'});
});

app.listen(3000, () => {
    readFilePromise('../db/userData.json')
        .then((data: string) => {
            registratedUsers = JSON.parse(data);

            console.log('Server running on port 3000');
        });
});



