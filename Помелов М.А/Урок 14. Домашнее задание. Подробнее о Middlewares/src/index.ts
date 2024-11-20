import express, { Request, Response, NextFunction } from 'express';
import { readFilePromise, writeFilePromise } from './file-operator_module'
import { User } from './User';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import path from 'path';
import multer, { Multer } from 'multer';
import * as fileSystem from 'fs';
import * as middlewares from './services/middlewares';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../public/views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));

const storage: multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
        if (!findUser) return;

        const uploadPath = path.join('../dist/uploads/', findUser.username);
        fileSystem.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload: any = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

function checkFileType(file: any, cb: any): void {
    // Разрешенные типы файлов
    const filetypes: any = /jpeg|jpg|png|gif/;
    // Проверка расширения файла
    const extName: any = path.extname(file.originalname).toLowerCase();
    const extname: any = filetypes.test(extName);
    // Проверка mime-типа
    const mimetype: any = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Ошибка: Только изображения!');
    }
};

// Вынести в отдельную папку (SHARED) и модуль. 
function replaceTemplateValues(userData: User): Promise<string> {
    return new Promise((resolve, reject) => {
        readFilePromise('../webApp/index.html')
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

export let registratedUsers: User[];



app.get('/registration-page', async (req: Request, res: Response) => {
    console.log('загрузка регистрации');
    res.set('Content-Type', 'text/html')
        .status(200);

    res.send(await readFilePromise("../webApp/registration-page.html"));
});

app.get('/', middlewares.checkCookies, (req: Request, res: Response) => {
    for (let i = 0; i < registratedUsers.length; i++) {
        if (req.cookies.token === registratedUsers[i].token) {
            res.render('user', { user: registratedUsers[i] });
            return;
        }
    }

});

app.post('/upload', middlewares.checkCookies, upload.single('file'), (req: Request, res: Response) => {
    console.log('enter');
    if (!req.file) {
        res.status(400).send('No file uploaded.');
    }
    else {
        const fileName: string = req.file.filename;
        let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);

        if (findUser) {
            registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token)?.listOfFiles.push({ name: fileName });
            writeFilePromise('../db/userData.json', JSON.stringify(registratedUsers, null, 2));
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

app.get('/enter-page', async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(await readFilePromise("../webApp/enter-page.html"));
});

app.post('/registration-page', middlewares.checkRegisteredUsers, express.urlencoded({ extended: true }), async (req: Request, res: Response) => {

    let user: User = new User(req.body.user);
    registratedUsers.push(user);

    writeFilePromise('../db/userData.json', JSON.stringify(registratedUsers, null, 2))
        .then(() => {
            return replaceTemplateValues(user);
        })
        .then(async (page) => {
            res.set('Content-Type', 'text/html')
                .status(201)
                .send(await readFilePromise("../webApp/enter-page.html"));
        })
});

app.post('/login', middlewares.validateUser, async (req: Request, res: Response) => {
    res.status(201).send({
        status: 201,
        message: 'success'
    });
})

app.get('/index', async (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html')
        .status(200);

    res.send(await readFilePromise("../webApp/index.html"));
});

app.get('/documents', middlewares.checkCookies, async (req: Request, res: Response) => {
    console.log(req.cookies.token);

    let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);

    if (findUser) {
        let files: { name: string }[] = findUser.listOfFiles;
        res.render('avaliableFiles', { files })
    }
    else {
        res.end('Ошибка!');
    }
});

app.get('/download', middlewares.checkCookies, async (req: Request, res: Response) => {
    let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
    const fileName = req.query.name;

    if (findUser) {
        res.header('Content-Disposition', 'attachment')
        res.status(200).sendFile(path.join(__dirname, `../dist/uploads/${findUser.username}/${fileName}`), function (err) {
            if (err) {
                console.error('Ошибка при загрузке файла:', err);
            } else {
                console.log('Загружен:', fileName);
            }
        });
    }
    else {
        res.end('Ошибка!');
    }
});

app.get('/exit', middlewares.checkCookies, (req: Request, res: Response) => {
    let findUser: User | undefined = registratedUsers.find(registratedUser => registratedUser.token === req.cookies.token);
    if (findUser) {
        findUser.token = null;
        res.writeHead(302, { 'Location': '/enter-page' });
        res.end();
    }
    else {
        res.end('Ошибка!');
    }
})

app.listen(3000, () => {
    readFilePromise('../db/userData.json')
        .then((data: string) => {
            registratedUsers = JSON.parse(data);

            console.log('Server running on port 3000')
        });
});




