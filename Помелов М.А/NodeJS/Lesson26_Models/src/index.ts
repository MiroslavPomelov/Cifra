import { MyCustomDataSource } from "./configuration/AppDataSource";
import { Person } from "./entities/Person";
import { Pet } from "./entities/Pet";

MyCustomDataSource.initialize().then(async () => {
    const pet1: Pet = new Pet();
    pet1.name = 'Volt';
    pet1.type = 'Dog';

    const pet2: Pet = new Pet();
    pet2.name = 'Bolt';
    pet2.type = 'Cat';

    const human: Person = new Person();
    human.name = 'John';

    pet1.owner = human;
    pet2.owner = human;
    human.pets = [pet1, pet2];


    await MyCustomDataSource.manager.save(human);
    await MyCustomDataSource.manager.save(pet1);
    await MyCustomDataSource.manager.save(pet2);
});