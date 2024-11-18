import { AppDataSource } from "./Configuration/dataSource";
import { Animal } from "./entities/subEntities/Animal";
import { Book } from "./entities/subEntities/Book";
import { Cooler } from "./entities/subEntities/Cooler";
import { CPU } from "./entities/subEntities/CPU";

import { MotherBoeard } from "./entities/subEntities/MotherBoard";
import { RAM } from "./entities/subEntities/RAM";
import { Videocard } from "./entities/subEntities/Videocard";

import { SystemUnit } from "./entities/systemUnit";

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

AppDataSource.initialize().then(async () => {
    const animal: Animal = new Animal("Strange creature", 'coala', 4);
    const book: Book = new Book("Трудности перевода", 'Война и мир', 'wors');

    await AppDataSource.manager.save([animal, book]);
    console.log('Data was uploaded')
})
    .catch(error => {
        console.log(error);
    })