// Type aliases

// type StringAlias = string;
// type NumberAlias = number;

// type Age = number;
// type Username = string;

// class Person {
//     private _name!: Username;
//     private _age!: Age;
// }




// type UserDefaults = { name: string, age: number };
// let some: UserDefaults = { name: 'asdasd', age: 23 };





// type SuccesResponse = { status: 'Succes', data: string };
// type ErroeResponse = { status: 'Error', data: string };
// type APIResponse = SuccesResponse | ErroeResponse;

// let response: APIResponse = { status: "Error", data: "dasdasd" };






// type Person = {
//     name: string;
//     age: number;

//     same: string;

// }

// type Employee = {
//     same: string;
//     employeeId: number;
// }

// type FullEmployee = Person & Employee;

// let full: FullEmployee = {
//     name: "Valeriy", age: 34, employeeId: 5, same: ''
// }






// class Some {
//     constructor(public some: string | undefined) { }
// }

// let some: Some = new Some(undefined);



// type MathOperation = (a: number, b: string) => string

// let foo: MathOperation = (a: number, b: string): string => {
//     console.log(`Number ${a}`)
//     return b;
// }


// foo(34, 'stroke');
// foo(34, 'stroke1');
// foo(34, 'stroke2');




// type Point = [number, number];
// let point: Point = [10, 10];

// type BooleanArr = boolean[];
// let trueFalsedArr: BooleanArr = [true, true, false];





// type Result<T> = {
//     succes: boolean;
//     data: T;
//     error: string;
// }

// let succesData: Result<number> = {
//     succes: true,
//     data: 98,
//     error: 'string'
// }