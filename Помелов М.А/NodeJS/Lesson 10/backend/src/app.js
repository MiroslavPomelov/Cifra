const http = require('http');
const PORT = 3000;
const Task = require('../classes/task');
const { stringify } = require('querystring');

let taskList = [];

const server = http.createServer((req, res) => {
    if (req.method === "OPTIONS") {
        req.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );
        res.end();
    }
    else if (req.url === '/tasks' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );

        res.end(JSON.stringify(taskList));
    }
    else if (req.url === '/tasks' && req.method === 'POST') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );

        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            let newTask = new Task(taskList.length + 1, data.title, data.completed);
            taskList.push(newTask);
            console.log(taskList);
        });

        res.end();
    }
    else {
        res.statusCode = 404;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );
        res.end('Страница не найдена');
    }
});

server.listen(PORT, () => {
    console.log(`server started at host: http://localhost:${PORT}`);
});



