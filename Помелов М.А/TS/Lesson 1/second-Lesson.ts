function add(a: number, b: number): number {
    return a + b;
}

function greete(name?: string): void {
    console.log(`Привет ${name}`)
}

greete();



function greet2(name: string = 'Гость', counter: number = 0): string {
    return `Гость ${name} по счету ${counter}`
}

greet2();



// Лбое кол-во элементов
function sum(...numbers: number[]): number {
    let sum: number = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return sum;
}

sum(1, 2);



function createFullName(fullName: string): string;
function createFullName(firstName: string, secondName: string, patronymic: string): string;
function createFullName(firstParam: string, secondParam?: string, thirdParam?: string): string {
    if (secondParam != undefiend && thirdParam != undefiend) {
        return `${firstParam}${secondParam}`
    } else {
        return firstParam;
    }

}

createFullName('dsad');







// Стрелочная функция

let summator = (a: number, b: number): number => a + b;
summator(25, 34);








