const express = require('express');
const app = express();


//-------------Нaчало блока с middleWare--------------
// app.use(express.json());

app.use((req, res, next) => {
    console.log(req.url, req.method);
    // res.send();

    next();
})
//-------------Конец блока с middleWare--------------


// Начало блока с маршрутизации
app.post('/', (req, res) => {
    let body = req.body;

    // let bode = '';
    // req.on('data', (chunk) => {
    //     bode += chunk.toString();
    // })

    // req.on('end', () => {
    //     console.log(bode);
    // })

    console.log(body);
    res.status(200).send('success');
})
// Конец блока с маршрутизации


app.listen(3000, () => {
    console.log('Server was started');
})