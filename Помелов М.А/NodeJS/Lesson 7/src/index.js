// 301 перенаправление (ресурс был перемещен на постоянной основе)
// 302 перенаправление (ресурс был перемещен на временой основе)

// 303 перенаправление (управляемое перемещение)

// 307 перенаправление (времнное без изменения метода запроса)
// 308 перенаправление (постояное без изменения метода запроса)



// ПЕРЕНАПРАВЛЕНИЕ
// const http = require('http');
// const PORT = 3000;

// const server = http.createServer((req, res) => {
//     if (req.url === '/old-path') {
//         res.writeHead(301, { 'location': '/new-path' });
//         res.end();
//     }
//     else if (req.url === '/new-path') {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('Glad to see you on new page');
//     }
//     else {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Resource not found');
//     }
// });


// server.listen(PORT, () => {
//     console.log(`Server hoster on http://localhost:${PORT}`);
// });





//ОТПРАВКА ДАННЫ{ ЧЕРЕЗ СТРОКУ ЗАПРОСА
// const url = require('url');

// const urlString = 'http://example.com:8000/path/name?name=Ivan&id=12';

// const parseUrl = url.parse(urlString, true);
// console.log(parseUrl.query.name);
// console.log(parseUrl.query.id);





// const url = require('url');
// const urlObject = {
//     prtotocol: 'http',
//     hostname: 'example.com',
//     port: '8000',
//     pathname: '/path/name',
//     query: {
//         query: 'string'
//     }
// }

// const formatedUrl = url.format(urlObject);
// console.log(formatedUrl);









//-----------------------

const task = require('../classes/task');
const taskReposit = require('../classes/taskReposit');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/tasks' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        
        res.end();
    } 
    else if (req.url === '/tasks' && req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello');
    } 
    else if (req.url === '/tasks/:id' && req.method === 'PUT') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

    }
    else if (req.url === '/tasks/:id' && req.method === 'DELETE') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Страница не найдена');
    }
});


server.listen(3000, () => {
    console.log('server started at host: http://localhost:3000')
});