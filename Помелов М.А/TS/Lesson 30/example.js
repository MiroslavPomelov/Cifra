"use strict";
// function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
//     const original: any = descriptor.value;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function RestrictionDeco(isAdmin) {
    return function (target, key, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (isAdmin) {
                throw new Error("U not Admin");
            }
            return originalMethod.apply(this, args);
        };
    };
}
class MyClass {
    adminMethod() {
        console.log('This available only admin!');
    }
}
__decorate([
    RestrictionDeco(true)
], MyClass.prototype, "adminMethod", null);
const myClass = new MyClass();
myClass.adminMethod();
