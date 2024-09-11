class Person {
    name: string;
    age: number;
    mail: string;
    phone: string;

    constructor(name: string, age: number, mail: string, phone: string) {
        this.name = name;
        this.age = age;
        this.mail = mail;
        this.phone = phone;
    }

    getContactInfo(): string {
        return `C ${this.name} можно связаться по телефону: ${this.phone}`;
    }
}

class Employee extends Person {
    experience: number;
    salary: number;

    constructor(name: string, age: number, mail: string, phone: string, experience: number, salary: number) {
        super(name, age, mail, phone);
        this.experience = experience;
        this.salary = salary;
    }

    getEmployeeInfo(): string {
        return `${this.name} c ${this.experience} годами опыта работы получает ${this.salary}`;
    }
}



class Manager extends Employee {
    departament: string;

    constructor(name: string, age: number, mail: string, phone: string, experience: number, salary: number, departament: string) {
        super(name, age, mail, phone, experience, salary);
        this.departament = departament;
    }



    getManagerInfo(): string {
        return `${this.name} управляет отделом ${this.departament}`;
    }


    getFullInfo(): string {
        return `${this.getContactInfo()} \n${this.getEmployeeInfo()} \n${this.getManagerInfo()}`;
    }
}

const person: Person = new Person('Anatoliy', 34, 'mail.ru', '+7938883sad2221')
const worker: Employee = new Employee('Valeriy', 25, 'mail.ru', '+79388832221', 5, 100000.00);
const manager: Manager = new Manager('Vasiliy', 25, 'mail.ru', '+79388832221', 5, 100000.00, 'Маркетинг');


console.log(person.getContactInfo());
console.log(worker.getContactInfo());
console.log(worker.getEmployeeInfo());
console.log(manager.getContactInfo());
console.log(manager.getEmployeeInfo());
console.log(manager.getManagerInfo());
console.log(manager.getFullInfo());

