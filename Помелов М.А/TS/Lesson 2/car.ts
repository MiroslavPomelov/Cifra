class Car {
    model: string;
    year: number;

    constructor(outerModel: string, outerYear: number) {
        this.model = outerModel;
        this.year = outerYear;
    }
}


const car1: Car = new Car('Toyota', 1992);
const car2: Car = new Car('GAZ', 1967);

