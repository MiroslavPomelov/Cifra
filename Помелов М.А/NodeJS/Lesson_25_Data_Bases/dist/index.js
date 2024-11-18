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
const data_source_1 = require("./configuration/data-source");
const User_1 = require("./entities/User");
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.User();
    newUser.firstName = "John";
    newUser.lastName = "Doe";
    newUser.age = 25;
    yield data_source_1.AppDataSource.manager.save(newUser);
    console.log('Saving new User in DB with id:' + newUser.id);
    const users = yield data_source_1.AppDataSource.manager.find(User_1.User);
    console.log('Uploaded users: ', users);
}));
