// const http = require('http');
// const { text } = require('stream/consumers');


// const server = http.createServer((req, res) => {
//     // Обработка запросов и ответов
// });


// const server = http.createServer((req, res) => {
//     //Работа с запросом
//     console.log(req.url);
//     console.log(req.method);
//     console.log(JSON.stringify(req.headers));

//     console.log(req.httpVersion);
//     console.log(req.connection.remoteAddress);
//     console.log(req.socket.remotePort);

//     //считывание тела запроса
//     let body = '';
//     req.on('data', chunk => {
//         body += chunk.toString();
//     })

//     //если надо будет вытащить body, то через await
//     req.on('end', () => {
//         console.log(body);
//     })


//     //Раюота с ответом
//     //Подготовка ответ
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     //Отвечаем
//     res.end('Привет мир');

// });

// server.listen(3000, () => {
//     console.log('server started at host: http://localhost:3000')
// })

//передача данных в url query, а не в body
// const http = require('http');
// const url = require('url')

// const server = http.createServer((req, res) => {
//     const queryObject = url.parse(req.url, true).query;//преобразует url  в строку и берет query

// })

// const http = require('http');
// const server = http.createServer((req, res) => {
//     //наполняем ответ
//     res.statusCode = 200;
//     res.statusMessage = 'Bad request'

//     res.setHeader('headertype', 'headercontent');
//     res.removeHeader('headercontent');

//    //все заголовки, сначала код статус, потом мэссэдж статус, потом объект с заголовками
//     res.writeHead(200, 'OK', {
//         'headertype1': 'headercontent1',
//         'headertype2': 'headercontent2',
//         'headertype3': 'headercontent3'
//     })
//     //отправка ответа
//     res.end();
// })

// //запуск сервера 1) порт и колбэк 2) порт, хост, колбэк
// const PORT = 3000;
// const HOST = 'localhost';


// server.listen(PORT, HOST, () => {
//     console.log(`север начал работу на http://${HOST}:${PORT}`)
// });

// server.close(() => {

// })

// server.setTimeout(5000, (socket) => {
//     console.log('Я не могу ответить');
//     socket.end(' соединение рву, слишком долго все');
// })

// server.getConnections((err, count) => {
//     if (err) {
//         console.log('Ошибка получения соединений');
//     } else{
//         console.log('открыто' + count + 'соединений');
//     }
// })

// server.on('request', (req, res) => {

// })

// server.on('close', () => {

// })

// server.on('error', (err) => {

// })











const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1>Добро пожаловать на новую страницу</h1>')
    } else if (req.url === '/about' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1>Добро пожаловать на страницу О нас </h1>')
    } else if (req.url === '/user-data' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        fs.readFileSync('../public/testData.json', 'utf8', (err, data) => {
            if (err) {
                console.log('Ошибка при чтения файла');
                res.statusCode = 500;
                res.statusMessage = 'Cant read this file';
                res.end();
            }

            res.end(data);
        });
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Страница не найдена');
    }
})


server.listen(3000, () => {
    console.log('server started at host: http://localhost:3000')
})