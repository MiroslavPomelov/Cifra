import { Pet } from "../Entities/Pet";
import { faker } from '@faker-js/faker';




export function generatePet(): Pet {

    const petTypes: { type: string, breeds: string[] }[] = [
        { type: 'Dog', breeds: ['Labrador', 'Buldog', 'Poodle', 'Bigle'] },
        { type: 'Cat', breeds: ['Siamese', 'Persian', 'Maine-Coon', 'Sphynx'] },
        { type: 'Rabbits', breeds: ['Loinhead', 'Flemish', 'Flemish Giant', 'Mini Rex'] },
        { type: 'Bird', breeds: ['Parrot', 'Cannary', 'Finch', 'Cocktatiel'] },
    ]

    const selectedPet = faker.helpers.arrayElement(petTypes);
    const breed = faker.helpers.arrayElement(selectedPet.breeds);

    return new Pet(
        faker.animal.petName(),
        faker.number.int({ min: 1, max: 15 }),
        selectedPet.type,
        breed
    );
}


