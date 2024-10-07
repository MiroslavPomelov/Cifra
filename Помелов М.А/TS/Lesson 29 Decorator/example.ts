// function LogFunc(constructor: Function) {
//     console.log(`Const ${constructor.name}`);
// }


// function SetMataData(metaData: any) {
//     return function (constructor: Function) {
//         constructor.prototype.MIROSLAV_FIELD = metaData;
//     }
// }

// @LogFunc
// @SetMataData({ role: 'Mir' })
// class Example {
//     constructor(public name: string) { }
// }

// const ex: Example = new Example('hello');
// console.log(ex.name);
// console.log((ex as any).MIROSLAV_FIELD);









// function WrapMethod(target: Function) {
//     for (const key of Object.getOwnPropertyNames(target.prototype)) {
//         const method = target.prototype[key];

//         // if (typeof method === 'string') {
//         //     target.prototype[key] = 55;
//         // }

//         if (typeof method === 'function') {
//             target.prototype[key] = function (...args: any[]) {
//                 console.log(`Method ${key} was called with param ${args}`); // Новое поведение
//                 return method.apply(this, args); // Старое поведение
//             }
//         }
//     }
// }


// @WrapMethod
// class Some {
//     field!: number;

//     prop(name: string) {
//         console.log('Hello world!');
//     }

//     prop1(age: number) {
//         console.log('Hello world!1');
//     }

//     prop2(some: any) {
//         console.log('Hello world2!');
//     }
// }

// const some: Some = new Some();
// console.log(some.field);
// some.prop('name');
// some.prop1(32);
// some.prop2({ name: 'Mir' });










function AddMetaData(metaData: any) {
    return function (constructor: Function) {
        constructor.prototype.metaData = metaData;
    }
}


@AddMetaData({ version: '1.0', author: 'John Doe' })
class MyComponent {
    constructor() { }
}

const ex: MyComponent = new MyComponent();
console.log((ex as any).metaData);

