class Person {
    name: string;
    age: number;
    height: number;
    phoneNumber: string;
}

let person: Person = new Person();
person.name = 'Valery';
person.age = 34;
person.height = 1.78;
person.phoneNumber = '891231231231';

console.log(`
    Имя: ${person.name}\n
    Возраст: ${person.age}\n
    Рост: ${person.height}\n
    Номер: ${person.phoneNumber}\n
    `);