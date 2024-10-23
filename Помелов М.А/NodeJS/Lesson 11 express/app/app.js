const express = require('express');
const app = express();

const PORT = 3000;


app.get('/', (req, res) => {
    res.header('')

    res.send('Hello from Express server');
});


app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`user ID: ${userId}`);
});


app.get('/search', (req, res) => {
    const query = req.query;
    // res.send(JSON.stringify(query));
    res.send(query);
});


app.post('/users', (req, res) => {
    let body = "";
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        res.status(201).send(`User was created: ${JSON.stringify(body)}`);
    });
});


app.put('/users/:id', (req, res) => {
    const userId = req.params.id;

    let bode = "";
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        console.log('asdasdasdasdasd');
        res.status(201).send(`User with ID ${userId}: ${JSON.stringify(body)}`);
    });
});


app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    res.status(200).send(`User with ID ${userId} succesfully deleted`);
});




app.listen(PORT, () => {
    console.log(`server has started at http://localhost:${PORT}`);
});