// class CPU {
//     model: string;
//     price: number;
//     frequency: number;
//     TDP: number;

//     constructor(model: string, price: number, frequency: number, TDP: number) {
//         this.model = model;
//         this.price = price;
//         this.frequency = frequency;
//         this.TDP = TDP;
//     }

//     displaySelfInfo() {
//         return `\tИнформация о прессоре:
//             \tМодель: ${this.model}
//             \tЧастота: ${this.frequency}
//             \tТепловыделение: ${this.TDP}
//             \tЦена: ${this.price}
//             `
//     }
// }


// class PC {
//     model: string;
//     price: number;
//     CPU: CPU;

//     constructor(model: string, price: number, CPU: CPU) {
//         this.model = model;
//         this.price = price;
//         this.CPU = CPU;
//     }

//     displaySelfInfo() {
//         console.log(`
//             Информация о компьютере:
//             Модель: ${this.model}
//             ${this.CPU.displaySelfInfo()}
//             Цена: ${this.price}
//             `)
//     }
// }

// const cpu:CPU = new CPU('M2', 45000.00, 4200.00, 340.00);
// const computer: PC = new PC('Asus', 100000.00, cpu);

// computer.displaySelfInfo();