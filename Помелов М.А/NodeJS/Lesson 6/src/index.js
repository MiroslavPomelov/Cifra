const http = require('http');
const fs = require('fs');
const os = require('os');
const machine = require('../classes/machine"');
const { stringify } = require('querystring');


const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end();
    } else if (req.url === '/student-data' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        fs.readFileSync('../public/studentData.json', 'utf8', (err, data) => {
            if (err) {
                console.log('Ошибка при чтения файла');
                res.statusCode = 500;
                res.statusMessage = 'Internal server error';
                res.end();
            }

            res.end(data);
        });
    } else if (req.url === '/server-info' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const machine = new Machine();
        res.end(JSON.stringify(machine.getInfo()));

        //serverInfo
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Страница не найдена');
    }
})


server.listen(3000, () => {
    console.log('server started at host: http://localhost:3000');
})