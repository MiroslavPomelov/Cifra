// console.log('start');

// setTimeout(() => {
//     console.log('Выполненин асинхроной операции');
// },5000);

// console.log('end');


//Исключения и промис

// let promise = new Promise((resolve, reject) =>{
//     try{
//         let obj = {
//             name: 'Ivan',
//             age: 32
//         };

//         resolve(obj);

//     }catch(error){
//         reject(error)
//     }
// });



// promise.then((result) => {
//     console.log(result);
// },
// (error)=>{
//     console.log(error);
// });


// promise.catch((error) => {
//     console.log(error);
// });

// promise.finally(() =>{

// });





let fisrtNumber = prompt('Введите первое число: ');
let secondNumber = prompt('Введите второе число: ');

let promise = new Promise((resolve, reject) => {

    try {
        setTimeout(() => {
            let result = fisrtNumber / secondNumber;

            resolve(result);
        });
        if (!fisrtNumber == Number && !secondNumber == Number) {
            throw Error('Вы ввели букву');
        }
        else if (secondNumber === 0) {
            throw Error('На ноль делить нельзя!');
        }

    } catch (error) {


        reject(error);
    }


});

promise.then((result) => {
    console.log(result);
},
    (error) => {
        console.log(error);
    });