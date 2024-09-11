"use strict";
class Person {
    constructor(name, age, mail, phone) {
        this.name = name;
        this.age = age;
        this.mail = mail;
        this.phone = phone;
    }
    getContactInfo() {
        return `C ${this.name} можно связаться по телефону: ${this.phone}`;
    }
}
class Employee extends Person {
    constructor(name, age, mail, phone, experience, salary) {
        super(name, age, mail, phone);
        this.experience = experience;
        this.salary = salary;
    }
    getEmployeeInfo() {
        return `${this.name} c ${this.experience} годами опыта работы получает ${this.salary}`;
    }
}
class Manager extends Employee {
    constructor(name, age, mail, phone, experience, salary, departament) {
        super(name, age, mail, phone, experience, salary);
        this.departament = departament;
    }
    getManagerInfo() {
        return `${this.name} управляет отделом ${this.departament}`;
    }
    getFullInfo() {
        return `${this.getContactInfo()} \n${this.getEmployeeInfo()} \n${this.getManagerInfo()}`;
    }
}
const person = new Person('Anatoliy', 34, 'mail.ru', '+7938883sad2221');
const worker = new Employee('Valeriy', 25, 'mail.ru', '+79388832221', 5, 100000.00);
const manager = new Manager('Vasiliy', 25, 'mail.ru', '+79388832221', 5, 100000.00, 'Маркетинг');
console.log(person.getContactInfo());
console.log(worker.getContactInfo());
console.log(worker.getEmployeeInfo());
console.log(manager.getContactInfo());
console.log(manager.getEmployeeInfo());
console.log(manager.getManagerInfo());
console.log(manager.getFullInfo());
