"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Student_1 = require("../entities/Student");
const Teacher_1 = require("../entities/Teacher");
exports.UniversityDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'university-database.sqlite',
    logging: false,
    synchronize: true,
    entities: [Student_1.Student, Teacher_1.Teacher],
    migrations: [],
    subscribers: []
});
