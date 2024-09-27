// type Cat = {
//     name: string;
//     breed: string;
// }

// type OnlyNumbersOrCats = {
//     [keys: string]: number | Cat
// }

// const some: OnlyNumbersOrCats = {
//     kittens: 10,
//     adultCat: 5,
//     cat1: {
//         name: "Barsik",
//         breed: "Siam"
//     },
//     cat2: {
//         name: "Barsik",
//         breed: "Siam"
//     },

// }




// type OptionsFlags<Type> = {
//     [Property in keyof Type]: boolean;
// }

// type Settings = {
//     autoSave: () => void;
//     notifications: () => void;
// }

// type SettingsOptions = OptionsFlags<Settings>;





// type Book = {
//     title: string;
//     author: string;
//     yearPublished: string;
//     available: boolean;
// }

// type Magazine = {
//     title: string;
//     issueNumber: number;
//     mounth: Date;
//     available: boolean;
// }

// type Newspaper = {
//     title: string;
//     date: Date;
//     editor: string;
//     available: boolean;
// }

// type LibraryItem = Book | Magazine | Newspaper;

// function isBook(type: LibraryItem): type is Book {
//     return (type as Book) !== undefined;
// }


// function gerProperty(type: LibraryItem, name: string) {
//     if (isBook(type)) {
//         if (name in type) {
//             return type[name];
//         }
//     }
// }

// let book: Book = {
//     title: 'aaaaaa',
//     author: 'bbbbbb',
//     yearPublished: '1999',
//     available: true
// }

// console.log(gerProperty(book, "yearPublished"));



// type ImmutableConfig = {
//     readonly host: string;
//     readonly port: number;
// }

// type MapNonEmmutable<Type> = {
//     -readonly [Property in keyof Type]: Type[Property];
// }

// type Example = MapNonEmmutable<ImmutableConfig>;

















// type Setters<Type> = {
//     [Property in keyof Type as `set${Capitalize<string & Property>}`]: (value: Type[Property]) => void;
// }

