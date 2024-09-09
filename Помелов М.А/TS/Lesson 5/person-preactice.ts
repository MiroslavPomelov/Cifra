// class Human {
//     heart: string;
//     body: number;
//     brain: Brain;


//     constructor(heart: string, body: number) {
//         this.heart = heart;
//         this.body = body;
//         this.brain = new Brain(1, 2);
//     }

// }




// class Brain {
//     volume: number;
//     capacity: number;

//     constructor(volume: number, capacity: number) {
//         this.volume = volume;
//         this.capacity = capacity;
//     }
// }



// const people: Human = new Human('есть', 1);



//2

class RAM {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class CPU {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class GPU {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Case {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class PoweUnit {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class MotherBoard {
    cpu: CPU;
    ram: RAM;
    gpu: GPU;

    constructor(cpu: CPU, ram: RAM, gpu: GPU) {
        this.cpu = cpu;
        this.ram = ram;
        this.gpu = gpu;
    }

        displaySelfInfo() {
        return `\tИнформация о материнке:
            ЦПУ: ${this.cpu}
            Озу: ${this.ram}
            Видеокарта: ${this.gpu}
            `
    }
}

class PC {
    motherBoard: MotherBoard;
    case: Case;
    powerunit: PoweUnit;

    constructor(motherBoard: MotherBoard, powerunit: PoweUnit) {
        this.motherBoard = motherBoard;
        this.case = new Case('asd');
        this.powerunit = new PoweUnit('assd');
    }

    displaySelfInfo() {
        console.log(`\tИнформация о компе:
            Мать: ${this.motherBoard}
            Блок: ${this.case}
            Блок питапния: ${this.powerunit}
            `);
    }
}

const cpu: CPU = new CPU('dasd');
const ram: RAM = new CPU('dasd');
const gpu: GPU = new CPU('dasd');
const powerunit: PoweUnit = new CPU('dasd');
const mother: MotherBoard = new MotherBoard(cpu, ram, gpu);


const pc: PC = new PC(mother, powerunit);

pc.displaySelfInfo();