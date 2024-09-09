class Engine {
    power: number;
    maker: string;
    working: boolean;

    constructor(power: number, maker: string, working: boolean) {
        this.power = power;
        this.maker = maker;
        this.working = working;
    }

    displayInfo() {
        return `Инфа о машине:
            Мощность: ${this.power}
            Производитель: ${this.maker}
            Запущен: ${this.working}
            `
    }
}

class Driver {
    fio: string;
    stage: number;

    constructor(fio: string, stage: number) {
        this.fio = fio;
        this.stage = stage;
    }

    displayInfo() {
        return `Инфа о машине:
            Водитель: ${this.fio}
            Стаж: ${this.stage}
            `
    }
}


class Car {
    mark: string;
    autoClass: string;
    weight: number;
    volume: number;


    engine: Engine;
    driver: Driver;

    constructor(mark: string, autoClass: string, weight: number, volume: number, driver: Driver) {
        this.mark = mark;
        this.autoClass = autoClass;
        this.weight = weight;
        this.volume = volume;
        this.driver = driver;
        this.engine = new Engine(5.0, "volvo", false)
    }

    start(): void {
        if (this.volume != 0) {
            this.engine.working = true;
        }
    }

    stop(): void {
        this.engine.working = false;
    }

    refuel(fuelRange: number): number {
        if (this.volume < 100) {
            this.volume += fuelRange;
        }
        return this.volume;
    }

    changeDriver(newDriver: Driver):  void {
        this.driver = newDriver;
    }

    draw(): void {
        const generalDiv: HTMLDivElement = document.createElement("div");
        const div: HTMLDivElement = document.createElement("div");
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.margin = '10px'
        div.style.backgroundColor = 'lightgrey';
        div.style.textAlign = 'center';
        div.style.lineHeight = '1px';


        const image: HTMLImageElement = document.createElement("img");
        image.src = "/imag.jpg";
        image.alt = 'picture';


        const age: HTMLParagraphElement = document.createElement("p");
        age.textContent = `Марка: ${this.mark}`;
        age.style.display = 'flex';
        age.style.justifyContent = 'left';

        const height: HTMLParagraphElement = document.createElement("p");
        height.textContent = `Класс: ${this.autoClass}`;
        height.style.display = 'flex';
        height.style.justifyContent = 'left';

        const phoneNumber: HTMLParagraphElement = document.createElement("p");
        phoneNumber.textContent = `Вес: ${this.weight}`;
        phoneNumber.style.display = 'flex';
        phoneNumber.style.justifyContent = 'left';


        //---------------------------------
        const div1: HTMLDivElement = document.createElement("div");
        div1.style.display = 'flex';
        div1.style.flexDirection = 'column';
        div1.style.justifyContent = 'center';
        div1.style.margin = '10px';
        div1.style.width = '20%';
        div1.style.height = '20%';
        div1.style.backgroundColor = 'lightgrey';
        div1.style.textAlign = 'center';
        div1.style.lineHeight = '1px';


        const image1: HTMLImageElement = document.createElement("img");
        image1.src = "/Engine.jpg";
        image1.alt = 'picture';


        const age1: HTMLParagraphElement = document.createElement("p");
        age1.textContent = `Мощность: ${this.engine.power}`;
        age1.style.display = 'flex';
        age1.style.justifyContent = 'left';

        const height1: HTMLParagraphElement = document.createElement("p");
        height1.textContent = `Производитель: ${this.engine.maker}`;
        height1.style.display = 'flex';
        height1.style.justifyContent = 'left';

        const height11: HTMLParagraphElement = document.createElement("p");
        height11.textContent = `Cостояние: ${this.engine.working}`;
        height11.style.display = 'flex';
        height11.style.justifyContent = 'left';

        const phoneNumber1: HTMLParagraphElement = document.createElement("p");
        phoneNumber1.textContent = `Вес: ${this.weight}`;
        phoneNumber1.style.display = 'flex';
        phoneNumber1.style.justifyContent = 'left';




        //---------------------------------
        const div2: HTMLDivElement = document.createElement("div");
        div2.style.display = 'flex';
        div2.style.flexDirection = 'column';
        div2.style.justifyContent = 'center';
        div2.style.margin = '10px';
        div2.style.width = '20%';
        div2.style.height = '20%';
        div2.style.backgroundColor = 'lightgrey';
        div2.style.textAlign = 'center';
        div2.style.lineHeight = '1px';


        const image2: HTMLImageElement = document.createElement("img");
        image2.src = "/image.jpg";
        image2.alt = 'picture';


        const age2: HTMLParagraphElement = document.createElement("p");
        age2.textContent = `ФИО: ${this.driver.fio}`;
        age2.style.display = 'flex';
        age2.style.justifyContent = 'left';

        const height2: HTMLParagraphElement = document.createElement("p");
        height2.textContent = `Саж вождения: ${this.driver.stage}`;
        height2.style.display = 'flex';
        height2.style.justifyContent = 'left';


        
        
        
        //=-=-=-=-==-=-=-==-=-=-=-=
        
        div.appendChild(image);
        div.appendChild(age);
        div.appendChild(height);
        div.appendChild(phoneNumber);
        generalDiv.appendChild(div);
        
        div1.appendChild(image1);
        div1.appendChild(age1);
        div1.appendChild(height1);
        div1.appendChild(phoneNumber1);
        generalDiv.appendChild(div1);


        div2.appendChild(image2);
        div2.appendChild(age2);
        div2.appendChild(height2);
        generalDiv.appendChild(div2);

        document.body.appendChild(generalDiv);
    }

    displayInfo(): void {
        console.log(`Инфа о машине:
            Водитель: ${this.driver}
            Движок: ${this.engine}
            `)
    }
}

const driver: Driver = new Driver('Богдан', 7);
const bugatti: Car = new Car('Bugatti', 'норм', 2000.00, 5.0, driver);
bugatti.draw();