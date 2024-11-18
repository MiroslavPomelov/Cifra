"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("./Configuration/dataSource");
const Animal_1 = require("./entities/subEntities/Animal");
const Book_1 = require("./entities/subEntities/Book");
// AppDataSource.initialize().then(async () => {
//     const cooler: Cooler = new Cooler();
//     cooler.TDP = 95;
//     cooler.RPM = 2000;
//     const motherboard: MotherBoeard = new MotherBoeard();
//     motherboard.Frequency = 3200;
//     motherboard.RunType = 'DDR4';
//     motherboard.MaxMemory = 64;
//     const cpu: CPU = new CPU();
//     cpu.Consumption = 200;
//     cpu.Frequency = 2666;
//     cpu.TDP = 280;
//     cpu.CorsNumber = 8;
//     const videocard: Videocard = new Videocard();
//     videocard.Consumption = 175;
//     videocard.Frequency = 1500;
//     videocard.RunType = "GDDR6";
//     const ram: RAM = new RAM();
//     ram.Capacity = 15;
//     ram.Frequency = 3200;
//     ram.Type = "DDR4";
//     const systemUnit: SystemUnit = new SystemUnit();
//     systemUnit.CPU = cpu;
//     systemUnit.MotherBoard = motherboard;
//     systemUnit.Cooler = cooler;
//     systemUnit.Videocard = videocard;
//     systemUnit.RAM = ram;
//     await CompuretDataSource.manager.save(systemUnit);
//     console.log('SU was saved');
// })
// .catch(error => {
//     console.log(error);
// });
dataSource_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const animal = new Animal_1.Animal("Strange creature", 'coala', 4);
    const book = new Book_1.Book("Трудности перевода", 'Война и мир', 'wors');
    yield dataSource_1.AppDataSource.manager.save([animal, book]);
    console.log('Data was uploaded');
}))
    .catch(error => {
    console.log(error);
});
