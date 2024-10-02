"use strict";
function Jumpable(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.age = 'sad';
        }
        jump() {
            console.log('Chicken jump!');
        }
    };
}
class Chicken {
    constructor(name) {
        this.name = name;
    }
    run() {
        console.log('running...');
    }
}
class Divice {
    turnOn() {
        console.log('on');
    }
}
class Smartphone extends Divice {
}
function Connectable(base) {
    return class extends base {
        connect() {
            console.log('Подключено к сети');
        }
    };
}
function Chargable(base) {
    return class extends base {
        charge() {
            console.log('Заряжается');
        }
    };
}
class NewClass extends Connectable(Chargable(Smartphone)) {
}
;
const nc = new NewClass();
nc.turnOn();
nc.charge();
nc.connect();
