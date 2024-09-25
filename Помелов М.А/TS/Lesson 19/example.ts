// let userInput: unknown;
// let userName: string;

// userInput = 5;
// userInput = "Ivan";

// if (typeof userInput === 'string') {
//     userInput.length;
// }
// else if (typeof userInput === 'number') {
//     userInput.toExponential();
// }


// function getUserInput(): unknown {
//     let input = prompt('Name:');
//     return input;
// }

// let newUsweInput: unknown = getUserInput();
// if (typeof newUsweInput === 'string') {
//     console.log(`Hello: ${newUsweInput.toUpperCase()}`);
// }






// interface UserProfile {
//     id: string,
//     name: string
// }

// function fetchData() {
//     return {
//         id: 10,
//         name: "Ivan"
//     }
// }

// function getUserProfile(): unknown {
//     let data = fetchData();
//     return data;
// }

// function isUserProfile(data: any): data is UserProfile {
//     return typeof data === 'object' && 'id' in data && 'name' in data;
// }

// let userData: unknown = getUserProfile();

// if (isUserProfile(userData)) {
//     console.log(`Profile: ${userData.name}`);
// }
// else {
//     console.log("Error");
// }





// let userInput: any;

// userInput = 5;
// userInput = '5';
// userInput = true;

// function doSomethingWithAny(any: {
//     name: {
//         firstSymbol: {
//             toUpperCase: () => void;
//         }
//     }
// }): any {
//     return any.name.firstSymbol.toUpperCase();
// }





// let person: object = {
//     name: "Inokentiy",
//     age: 30
// }

// let numbers: object = [1, 2, 3, 4];





// let obj: Object;
// obj = {};
// obj = [];
// obj = new Object();
// obj = new Date();
// obj = new Map();
// obj = () => {

// };

// obj = 5;
// obj = 'Hello';







// let tuple: [number, string] = [14, 'stroke'];

// console.log(tuple[0]);
// console.log(tuple[1]);






// let func: Function = function (a: number, b: string): void {

// }





type AdminAction = 'CREATE' | 'ACTIVATE';

const showAdminMassage = (action: AdminAction) => {
    switch (action) {
        case 'CREATE':
            return 'CREATED';

        case 'ACTIVATE':
            return 'ACTIVATED';

        default:
            throw new Error("ERROR");
    }
}

