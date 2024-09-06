class Car {
    make: string;
    model: string;
    fuelLevel: number;
    speed: number;

    constructor(make: string, model: string, fuelLevel: number, speed: number) {
        this.make = make;
        this.model = model;
        this.fuelLevel = fuelLevel;
        this.speed = speed;
    }


    drive(): void {
        if (this.refuel() && this.fastenSeatbelt() && this.stratEngine()) {
            this.accelerate();
        }
    }

    refuel(): boolean {
        if (this.fuelLevel < 10) {
            console.log("Низкий уровень топлива! Заправка...");
            this.fuelLevel = 100;
        } else {
            console.log('Топливо достаточно для старта!');
        }

        return true;
    }

    fastenSeatbelt(): boolean {
        console.log("Пристегивание ремня безопасности");
        return true;
    }

    stratEngine(): boolean {
        console.log("Запуск двигателя");
        return true;
    }

    accelerate(): void {
        console.log("Увеличение сорости...");
        this.speed = 60;
        console.log(`Теперь машина едет со скоростью ${this.speed} км/ч`);
    }
}

const myCar: Car = new Car("Japan", 'Toyota', 5, 0);

myCar.drive();