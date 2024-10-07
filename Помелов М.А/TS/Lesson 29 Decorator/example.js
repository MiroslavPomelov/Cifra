"use strict";
// function LogFunc(constructor: Function) {
//     console.log(`Const ${constructor.name}`);
// }
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
function AddMetaData(metaData) {
    return function (constructor) {
        constructor.prototype.metaData = metaData;
    };
}
let MyComponent = (() => {
    let _classDecorators = [AddMetaData({ version: '1.0', author: 'John Doe' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyComponent = _classThis = class {
        constructor() { }
    };
    __setFunctionName(_classThis, "MyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyComponent = _classThis;
})();
const ex = new MyComponent();
console.log(ex.metaData);
