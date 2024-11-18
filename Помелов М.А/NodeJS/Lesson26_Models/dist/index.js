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
const AppDataSource_1 = require("./configuration/AppDataSource");
const Person_1 = require("./entities/Person");
const Pet_1 = require("./entities/Pet");
AppDataSource_1.MyCustomDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const pet1 = new Pet_1.Pet();
    pet1.name = 'Volt';
    pet1.type = 'Dog';
    const pet2 = new Pet_1.Pet();
    pet2.name = 'Bolt';
    pet2.type = 'Cat';
    const human = new Person_1.Person();
    human.name = 'John';
    pet1.owner = human;
    pet2.owner = human;
    human.pets = [pet1, pet2];
    yield AppDataSource_1.MyCustomDataSource.manager.save(human);
    yield AppDataSource_1.MyCustomDataSource.manager.save(pet1);
}));
