type Constructor<T = {}> = new (...args: any[]) => T;

function Jumpable<T extends Constructor>(base: T) {
    return class extends base {
        age: string = 'sad';

        jump() {
            console.log('Chicken jump!');
        }
    }
}

class Chicken {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    run() {
        console.log('running...')
    }
}




class Divice {

    turnOn(): void {
        console.log('on')
    }
}


class Smartphone extends Divice {
    
}

function Connectable<T extends Constructor>(base: T) {
    return class extends base {

        connect(): void {
            console.log('Подключено к сети')
        }
    }
}

function Chargable<T extends Constructor>(base: T) {
    return class extends base {

        charge(): void {
            console.log('Заряжается')
        }
    }
}

class NewClass extends Connectable(Chargable(Smartphone)) { };
const nc: NewClass = new NewClass();

nc.turnOn();
nc.charge();
nc.connect();

