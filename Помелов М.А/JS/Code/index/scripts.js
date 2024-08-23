// const [getData] = (url) =>
//     new Promise((resolve, reject) =>
//         fetch(url)
//             .then(response => response.json())
//             .then(json => resolve(json))
//             .catch(error => reject(error))
//     );



//     getData('https://jsonplaceholder.typicode.com/users')
//         .then(data => console.log(data))
//         .catch(error => console.log(error.message));


// for (let j = 0; j < arr.length; j++) {
//     console.log(arr[j]);
// }









// async function many() {
//     let [data1, data2, data3] = await Promise.all([
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json()),

//         fetch('https://jsonplaceholder.typicode.com/users/2')
//             .then(response => response.json()),

//         fetch('https://jsonplaceholder.typicode.com/users/3')
//             .then(response => response.json())
//     ])

//     console.log(data1);
//     console.log(data2);
//     console.log(data3);
// }

// many();







// async function many(i) {
//    let [data] = await Promise.all([
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => response.json())
//     ])

//     console.log(data[i].name);
//     return data[i].name;

// }



// many(1);


// const p = document.querySelector('p');
// p.textContent = `${many(1)}`;
// // Результат: <h1>Новый заголовок</h1>




// function getUserName(i) {
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => { return response.json() })
//         .then(result => {

//             console.log(result[i].name)
//             return result[i].name;
//         })
// }

// let p = document.querySelector('p');
// p.textContent = `${getUserName(0)}`;


fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.map(d=>{
            const html = `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.email}</td>
                    <td>${d.address.city}</td>
                    <td>${d.phone}</td>
                    <td>${d.website}</td>
                    <td>${d.company.name}</td>
                </tr>
            `;
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);
 
        });
    });