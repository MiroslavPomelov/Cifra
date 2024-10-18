// const fs = require('fs');
// const path = require('path');


// const sourceFilePath = path.join(__dirname, 'example.txt');
// const destinationFilePath = path.join(__dirname, 'destination.txt');


// const readableStream = fs.createReadStream(sourceFilePath);
// const writableStream = fs.createWriteStream(destinationFilePath);


// readableStream.pipe(writableStream);








// const readableStream = fs.createReadStream('example.txt');

// readableStream.on('data', (chunk) => {
//     console.log('Get data block' + chunk.toString());
// });







// const http = require('http');
// const fs = require('fs');


// const server = http.createServer((req, res) => {
//     if (req.url === '/upload' && req.method === "POST") {
//         const writable = fs.createWriteStream('new.txt');


//         req.pipe(writable);
//     }
// })



// server.listen(3000, () => {
//     console.log(`hello`);
// });

















const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/get-student?id' && req.method == 'GET') {
        fs.readFile('data/student.json', 'utf-8', (errJson, dataJson) => {
            fs.readFile('public/index.html', 'utf8', (errHTML, dataHTML) => {
                if (errHTML) {
                    throw new Error("AOAOAO");
                }
                console.log(dataHTML);
            });
        })

    }
    res.end(index);
});

server.listen(3000, () => {
    console.log('server started at host: http://localhost:3000');
})