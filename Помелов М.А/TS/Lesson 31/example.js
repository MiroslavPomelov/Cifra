"use strict";
// Декораторы параметров
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
function GetMeta(target, propertyKey, parameterIndex) {
    var existingLogParameters = Reflect.getOwnMetadata('logParameters', target, propertyKey) || [];
    existingLogParameters.push(parameterIndex);
    Reflect.defineMetadata('logParameters', existingLogParameters, target, propertyKey);
}
function ValidateMethod(target, key, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var loggedParameters = Reflect.getOwnMetadata('logParameters', target, key) || [];
        loggedParameters.forEach(function (index) {
            var parameterValue = args[index];
            if (typeof args[1] === 'number') {
                if (args[1] < 0 || args[1] > 100) {
                    throw new Error("OAAAAAAADDDDDDDDDDAAAAAAAAAAA");
                }
            }
            console.log("Method ".concat(key, ", Parameters Index ").concat(index, " Value of Parameter ").concat(parameterValue));
        });
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.changePersonData = function (name, age) {
        this.name = name;
        this.age = age;
    };
    __decorate([
        ValidateMethod,
        __param(0, GetMeta),
        __param(1, GetMeta),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "changePersonData", null);
    return Person;
}());
var ex = new Person('Ivan', 20);
ex.changePersonData('Ivan', 200);
