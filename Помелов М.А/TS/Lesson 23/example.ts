// type Example<T> = {
//     [P in keyof T]: string
// }

// type User = {
//     name: number;
//     age: number;
//     password: number;
// }


// type StringifiedUser = Example<User>;
// const user: StringifiedUser =
// {
//     name: "Valeiy",
//     age: "Valeiy",
//     password: "Valeiy"
// }


// // Необязательный
// type OptionalUser = Partial<User>;












// Обновление значения
// interface User {
//     name: string;
//     age: number;
//     mail: string;
// }

// function updateUser(user: User, updates: Partial<User>): User {
//     return {
//         ...user,
//         ...updates
//     }
// }

// let user: User = {
//     name: 'Valriy',
//     age: 32,
//     mail: 'mail.ru'
// }

// let newUser = updateUser(user, { age: 35 });






// //Readonly
// interface User {
//     name: string;
//     age: number;
//     mail: string;
// }

// const user: Readonly<User> = {
//     name: 'Valriy',
//     age: 32,
//     mail: 'mail.ru'
// }

// type CustomReadonly<IncomingType> = {
//     readonly [Property in keyof IncomingType]: IncomingType[Property]
// }



//Required


// class User {
//     constructor(public name: string, public age: number, public mail: string) { }
// }

// const user: Readonly<User> = new User("Valeriy", 32, "ivanov@mail.ru");





// // NonNullable
// interface User {
//     name: string;
//     age: number;
//     mail: string;
//     pet: NonNullable<Pet>
// }

// interface Pet {
//     name: string;
// }




interface UserProfile {
    id: number
    userName: string;
    mail: string;
    fullName: string;
    addres: string;
    phone: number;
}

let newUser: UserProfile;

type OptionalUserProfile = Partial<UserProfile>;

let currentUserProfile: UserProfile = {
    id: 1,
    userName: 'string',
    mail: 'string',
    fullName: 'string',
    addres: 'string',
    phone: 66465
}

type PartialUserProfileUpdate = {
    fullName: string,
    addres: string
}

let upd: PartialUserProfileUpdate = {
    fullName: 'stringSSSSSSSSSSSS',
    addres: 'stringSSSSSSSSSSSS'
};


function updateUserProfile(user: UserProfile, updateData: OptionalUserProfile): UserProfile {
    return {
        ...user,
        ...updateData
    }
}


let updatedUser = updateUserProfile(currentUserProfile, upd);

console.log(updatedUser);
