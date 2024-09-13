"use strict";
class MyClass {
    static getStaticField() {
        console.log(MyClass.field);
    }
}
// let first: MyClass = new MyClass();
MyClass.field = 34;
MyClass.getStaticField();
