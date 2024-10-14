const fs = require('fs');
const moment = require('moment');


//READ
// fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//         throw new Error(err.message);
//     }
//     console.log(data);
// });


//REWrite
// fs.writeFile('test.txt', 'Some data to write AAdsadAAAA', 'utf-8', (err) => {
//     if (err) {
//         throw new Error(err.message);
//     }
//     console.log('Data was succesfully writed!');
// });


//WRITE
// fs.appendFile('text.txt', '\n\rSome content AOAOAO', 'utf-8', (err) => {
//     if (err) {
//         throw new Error(err.message);
//     }
//     console.log('Data was succesfully writed!');
// });


//---------------------------------------------------------------------------------------------
// let now = moment().format('LLLL | hh_mm_ss');

// function logFunction() {
//     fs.appendFile('text.txt', `\n\rДата и время: ${now} : Все хорошо`, 'utf-8', (err) => {
//         if (err) {
//             throw new Error(err.message);
//         }
//         console.log('Data was succesfully writed!');
//     });

// }

// setInterval(logFunction, 5000, 1);
//---------------------------------------------------------------------------------------------



//RENAME
// fs.rename('newTest.txt', 'newTest.txt', (err) => {
//     if (err) {
//         console.log('Возникла ошибка');
//         throw new Error(err.message);
//     }
//     console.log('File has been renamed');
// });




//DELETE
// fs.unlink('newTest.txt', (err) => {
//     if (err) {
//         console.log(err);
//         throw new Error(err.message);
//     }
//     console.log('Data has been removed');
// });

fs.mkdir('newDir', { recursive: true }, (err) => {
    if (err) {
        console.log(err);
        throw new Error(err.message);
    }
    console.log('Folder created');
});


