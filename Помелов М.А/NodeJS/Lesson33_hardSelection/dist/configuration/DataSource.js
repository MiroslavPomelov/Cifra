"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const University_1 = require("../Entities/University");
const Teacher_1 = require("../Entities/Teacher");
const Student_1 = require("../Entities/Student");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'univer.sqlite',
    synchronize: true,
    logging: false,
    entities: [University_1.University, Teacher_1.Teacher, Student_1.Student],
    subscribers: [],
    migrations: []
});
