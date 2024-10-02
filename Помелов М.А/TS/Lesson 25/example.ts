// const age = 25;
// const message = age >= 18 ? 'Adult' : 'Not adult';


// const score = 85;
// const grade = score >= 90 ? 'A' :
//               score >= 80 ? 'B' :
//               score >= 70 ? 'C' :
//               score >= 60 ? 'D' :
//               'Useless';


// function getFee(isMember: number) {
//     return isMember ? 2 : 10;
// }




// условие       T : F
// T extends U ? X : Y


// type IsString<T> = T extends string ? 'Yes' : 'No';

// type NoStr = IsString<string>;
// const str: NoStr = 'Yes';

// type Str = IsString<number>;
// const nstr: Str = 'No';




// Исключение
// type Diff<T, U> = T extends U ? never : T;

// type Some = Diff<string | number | boolean | object, string | number>;





// Фильтрация на NULL
// type NotNull<T> = T extends null | undefined ? never : T;

// type A = NotNull<string | number | undefined>;
// type B = NotNull<number | null | undefined>;





//  Условные типы с распределениями
// type Extraction<T, U> = T extends U ? T : never;
// type A = Extraction<string | number | boolean, string>;





// С функциями
// type TypeReturning<T> = T extends (...args: any[]) => infer R ? R : any;

// function f1(): string {
//     return 'Hello';
// }

// type A = TypeReturning<typeof f1>;

// type B = ReturnType<typeof f1>;








//READONLY 
// interface Some {
//     age: number;
//     name: string;
//     addres: {
//         street: string;
//         city: string;
//     }
// }

// type ReadonlyType<T> = {
//     readonly [Property in keyof T]: ReadonlyType<T[Property]>
// }

// type NewSome = ReadonlyType<Some>;






//1
type CheckString<T> = T extends string ? true : false;

//2
type ReturnTypeOfFunction<T> = T extends (...args: any[]) => infer R ? R : any;

//3
type ElementType<T> = T extends any[] ? T[number] : any;


type A = ElementType<boolean[]>; 





