const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.get('/user/:id', (req, res) => {
    const userData = fs.readFile('../Database/Users.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }

        const users = JSON.parse(data);
        const concreteUsers = users.find(user => user.id );

        res.send(200);

    });
});

app.get('/logger', (req, res) => {
    res.send(200);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})