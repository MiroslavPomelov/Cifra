// let xhr = new XMLHttpRequest(); //создали

// // Запрос
// xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true); //куда и ассинхронный ли запрос

// xhr.setRequestHeader('Content-Type', 'application-json');//заголовки ключ и дсон


// //
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// }

// xhr.send(JSON.stringify(
//     {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// }
// ));

// // гет запрос
// // xhr.send(JSON.stringify({ key: 'value' }));
// // console.log(xhr.responseText);






let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

xhr.setRequestHeader('Content-Type', 'application-json');

function operator(data){
    let users = [];
    console.log(data);
    users.push(data);
}

let promise = new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
        }
    }
});

promise.then(operator);
xhr.send();
















let plate = document.createElement('div');
let info = document.createElement('div');
let nameBlock = document.createElement('h3');
let button = document.createElement('button');


plate.style.display = 'flex';
plate.style.justifyContent = 'space-between';
plate.style.backgroundColor = 'lightgrey';
plate.style.borderRadius = '20px';
plate.style.padding = '20px';

info.textContent = 'i';
info.style.alignContent = 'center';
info.style.textAlign = 'center';
info.style.fontSize = '40px';
info.style.color = 'white';
info.style.backgroundColor = 'lightblue';
info.style.border = 'none';
info.style.borderRadius = '50%';
info.style.width = '100px';
info.style.height = '100px';


nameBlock.style.color = 'forestgreen';
nameBlock.textContent = 'asdasd';
nameBlock.style.fontSize = '30px';

button.style.width = '150px';
button.style.height = '50px';
button.style.alignSelf = 'center';
button.style.borderRadius = '10px';
button.style.border = 'none';
button.style.backgroundColor = 'lightblue';
button.textContent = 'lightblue';

document.body.appendChild(plate);
plate.appendChild(info);
plate.appendChild(nameBlock);
plate.appendChild(button);




