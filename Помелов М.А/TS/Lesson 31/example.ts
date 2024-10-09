// Декораторы параметров

import "reflect-metadata";

// function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
//     console.log(target);
//     console.log(propertyKey);
//     console.log(parameterIndex);
// }






// function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
//     const existingLogParameters: number[] = Reflect.getOwnMetadata('logParameters', target, propertyKey) || [];

//     existingLogParameters.push(parameterIndex);

//     Reflect.defineMetadata('logParameters', existingLogParameters, target, propertyKey);
// }

// function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
//     const originalMethod: any = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//         const loggedParameters: number[] = Reflect.getOwnMetadata('logParameters', target, key) || [];

//         // Логируем значения параметров
//         loggedParameters.forEach(index => {
//             const parameterValue = args[index];
//             console.log(`Method ${key}, Parameters Index ${index} Value of Parameter ${parameterValue}, Time ${new Date()}`);
//         });

//         return originalMethod.apply(this, args);
//     }
//     return descriptor;
// }

// class ExampleClass {
//     @LogMethod
//     public greet(@LogParameter message: string, @LogParameter name: string): void {
//         console.log(`${name} writing message: "${message}"`);
//     }
// }

// const ex: ExampleClass = new ExampleClass();
// ex.greet('Hello friend', 'Ivan');















function GetMeta(target: any, propertyKey: string, parameterIndex: number) {
    const existingLogParameters: number[] = Reflect.getOwnMetadata('logParameters', target, propertyKey) || [];

    existingLogParameters.push(parameterIndex);

    Reflect.defineMetadata('logParameters', existingLogParameters, target, propertyKey);
}

function ValidateMethod(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const loggedParameters: number[] = Reflect.getOwnMetadata('logParameters', target, key) || [];

        loggedParameters.forEach(index => {
            const parameterValue = args[index];
            if (typeof args[1] === 'number') {
                if (args[1] < 0 || args[1] > 100) {
                    throw new Error("OAAAAAAADDDDDDDDDDAAAAAAAAAAA");
                }
            }
            console.log(`Method ${key}, Parameters Index ${index} Value of Parameter ${parameterValue}`);
        });

        return originalMethod.apply(this, args);
    }
    return descriptor;
}

class Person {
    name: string;
    age: number;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    @ValidateMethod
    public changePersonData(@GetMeta name: any, @GetMeta age: any): void {
        this.name = name;
        this.age = age;
    }
}

const ex: Person = new Person('Ivan', 20);
ex.changePersonData('Ivan', 200);















