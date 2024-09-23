import { Company } from "./additionals/employee";
import { Department } from "./additionals/department";

const programmer: Company.Employee = new Company.Employee('Mir', "25", 'programmer');
const manager: Company.Employee = new Company.Employee('Elena', "55", 'manager');
const teacher: Company.Employee = new Company.Employee('Bogdan', "25", 'teacher');

const department: Department = new Department('Cifra', [programmer, manager, teacher]);

console.log(department.getEmployee());
programmer.getInfo();