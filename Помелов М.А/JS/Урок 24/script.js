// fetch('https://jsonplaceholder.typicode.com/users')
// .then(response => response.json())
// .then(users => {
//     console.log(users[4]);
// })
// .catch(error => console.error(error));








// let newPost = {
//     title: 'Primer',
//     body: 'Photo',
//     userid: 1
// }

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(newPost) 
// }).then(response => {
//     if (response.ok) {
//         return response.json();
//     } else{
//         console.log('Erross');
//     }
// }).then(result => console.log(result))





let headers = new Headers();
headers.append('Content-Type', 'text/plain');
headers.append('Authorization', 'token_MY_TOKEN');

fetch('https://jsonplaceholder.typicode.com/posts',{
    mode: 'no-cors',
    method: 'GET',
    headers: headers
})


