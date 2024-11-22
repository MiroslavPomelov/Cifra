"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePet = generatePet;
const Pet_1 = require("../Entities/Pet");
const faker_1 = require("@faker-js/faker");
function generatePet() {
    const petTypes = [
        { type: 'Dog', breeds: ['Labrador', 'Buldog', 'Poodle', 'Bigle'] },
        { type: 'Cat', breeds: ['Siamese', 'Persian', 'Maine-Coon', 'Sphynx'] },
        { type: 'Rabbits', breeds: ['Loinhead', 'Flemish', 'Flemish Giant', 'Mini Rex'] },
        { type: 'Bird', breeds: ['Parrot', 'Cannary', 'Finch', 'Cocktatiel'] },
    ];
    const selectedPet = faker_1.faker.helpers.arrayElement(petTypes);
    const breed = faker_1.faker.helpers.arrayElement(selectedPet.breeds);
    return new Pet_1.Pet(faker_1.faker.animal.petName(), faker_1.faker.number.int({ min: 1, max: 15 }), selectedPet.type, breed);
}
