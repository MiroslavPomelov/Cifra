"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Student_1 = require("../entities/Student");
const Teacher_1 = require("../entities/Teacher");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: 'repository.sqlite',
    logging: false,
    synchronize: true,
    entities: [Teacher_1.Teacher, Student_1.Student],
    migrations: [],
    subscribers: []
});
