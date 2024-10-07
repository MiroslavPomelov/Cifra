// function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
//     const original: any = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         console.log(`Method ${key} was called with parameters ${args}`);
//         return original.apply(this, args);
//     }
//     return descriptor;
// }

// class MyClass {
//     name: string;

//     constructor(name: string) {
//         this.name = name;
//     }

//     @LogMethod
//     myMethod(arg1: number, arg2: string) {
//         console.log(`Runnig method ${arg1} and ${arg2}`);
//     }
// }

// const instance: MyClass = new MyClass('aaa');
// instance.myMethod(25, 'Example');






// function RestrictionDeco(target: any, key: string, descriptor: PropertyDescriptor) {
//     const originalMethod: any = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         if (!target.isAdmin) {
//             throw new Error("U not Admin");
//         }
//         return originalMethod.apply(this, args);
//     }
// }


















// function RestrictionDeco(isAdmin: boolean) {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         const originalMethod: any = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             if (isAdmin) {
//                 throw new Error("U not Admin");
//             }
//             return originalMethod.apply(this, args);
//         }
//     }
// }

// class MyClass {
//     @RestrictionDeco(true)
//     adminMethod() {
//         console.log('This available only admin!');
//     }
// }

// const myClass: MyClass = new MyClass();
// myClass.adminMethod();












class Person {
    @Validate
    name: any;

    constructor(name: string) {
        this.name = name;
    }
}

function Validate(target: any, key: string) {
    let value = target[key];

    const getter = () => value;
    const setter = (newValue: any) => {
        if (typeof newValue !== 'string') {
            throw new Error("Argument Exception");
        }

        value = newValue;
    }

    Object.defineProperty(target, key, {
        enumerable: false,
        configurable: true,
        get: getter,
        set: setter
    })
}

let pers: Person = new Person('Valeriy');
pers.name = 55;