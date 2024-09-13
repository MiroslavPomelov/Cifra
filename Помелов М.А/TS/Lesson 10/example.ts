class MyClass {
    static field: number;
    static getStaticField(): void {
        console.log(MyClass.field);
    }
}

// let first: MyClass = new MyClass();
MyClass.field = 34;
MyClass.getStaticField();
