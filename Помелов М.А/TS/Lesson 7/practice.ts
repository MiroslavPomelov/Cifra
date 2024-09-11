class EducationInstitution {
    name: string;
    location: string;

    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }

    getDetails(): string {
        return `${this.name} и ${this.location}`;
    }
}

class School extends EducationInstitution {
    numberOfStudents: number;
    schoolType: string;

    constructor(name: string, location: string, numberOfStudents: number, schoolType: string) {
        super(name, location);
        this.numberOfStudents = numberOfStudents;
        this.schoolType = schoolType;
    }

    getSchoolType(): string {
        return `Тип школы: ${this.schoolType}`;
    }
}

class HighSchool extends School {
    numberOfTeachers: number;
    hasSportsTeam: boolean;

    constructor(name: string, location: string, numberOfStudents: number, schoolType: string, numberOfTeachers: number, hasSportsTeam: boolean) {
        super(name, location, numberOfStudents, schoolType);
        this.numberOfTeachers = numberOfTeachers;
        this.hasSportsTeam = hasSportsTeam;
    }

    getTeacherStudentRatio(): number {
        return this.numberOfStudents / this.numberOfTeachers;
    }
}


class University extends HighSchool {
    numberOfDepartments: number;
    hasReachFacilities: boolean;

    constructor(name: string, location: string, numberOfStudents: number, schoolType: string, numberOfTeachers: number, hasSportsTeam: boolean, numberOfDepartments: number, hasReachFacilities: boolean) {
        super(name, location, numberOfStudents, schoolType, numberOfTeachers, hasSportsTeam);
        this.numberOfDepartments = numberOfDepartments;
        this.hasReachFacilities = hasReachFacilities;
    }

    getDepartmentDetails(): number {
        return this.numberOfDepartments;
    }
}


