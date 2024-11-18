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
const UniversityDataSource_1 = require("./configuration/UniversityDataSource");
const Student_1 = require("./entities/Student");
const Teacher_1 = require("./entities/Teacher");
UniversityDataSource_1.UniversityDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = [
        (0, Teacher_1.createTeacher)('John', []),
        (0, Teacher_1.createTeacher)('Alex', []),
        (0, Teacher_1.createTeacher)('Bob', []),
        (0, Teacher_1.createTeacher)('Rap', []),
    ];
    const students = [
        (0, Student_1.createStudent)('Anatoliy', [teachers[0], teachers[1]]),
        (0, Student_1.createStudent)('Anatoliy', [teachers[2], teachers[3]]),
        (0, Student_1.createStudent)('Anatoliy', [teachers[1], teachers[3]]),
        (0, Student_1.createStudent)('Anatoliy', [teachers[0], teachers[1]]),
        (0, Student_1.createStudent)('Anatoliy', [teachers[1], teachers[3]]),
        (0, Student_1.createStudent)('Anatoliy', [teachers[0], teachers[1]]),
    ];
    teachers[0].students = [students[3], students[3]];
    teachers[1].students = [students[0], students[2], students[3], students[4], students[5]];
    teachers[2].students = [students[1], students[4], students[5]];
    teachers[3].students = [students[1], students[2], students[4], students[5]];
    yield UniversityDataSource_1.UniversityDataSource.manager.save(teachers);
    yield UniversityDataSource_1.UniversityDataSource.manager.save(students);
    console.log('Data saved');
}));
