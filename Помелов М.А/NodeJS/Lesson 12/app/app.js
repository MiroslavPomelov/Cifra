const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;

app.get('/auth', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    res.status(200).sendFile(path.join(__dirname, '/public/auth.html'));
});

app.post('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    let body = "";
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const userData = JSON.parse(body);

        fs.readFile('./app/data/users.json', 'utf8', (err, data) => {
            if (err) {
                throw new Error("ERROR!");
            }
            const usersList = JSON.parse(data);
            usersList.forEach(user => {
                if (user.username === userData.username && user.password === userData.password) {
                    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
                }
            });
        });



        // res.status(200).send(`User with ID ${userId}: ${JSON.stringify(body)}`);
    });
});


app.listen(PORT, () => {
    console.log(`server has started at http://localhost:${PORT}`);
});