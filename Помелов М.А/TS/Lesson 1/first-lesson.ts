// Логический тип
let isAvailable: boolean = true;
let isComplete: boolean = false;

console.log(isAvailable);

// Числовой тип
let temperature: number = 23.5;
let count: number = 5;

let decimal: number = 255;
let hex: number = 0xff;
let binary: number = 0b11111111;

// Строковый тип
let myName: string = 'Имя';
let city: string = 'Калинград';
let info: string = `Город ${city}`;

// Тип больших чисел
let largeNumber1: bigint = BigInt(1124124331231231312312312312);
let largeNumber2: bigint = 1124124331231231312312312312n;

// Любой тип данных
let dynamicValue: any = true;

// Неизвестный тип
let uncerainValue: unknown = 'asdasd';

if (typeof uncerainValue === 'string') {
    console.log(uncerainValue.toLocaleUpperCase);
}
else if (typeof uncerainValue === 'number') {
    console.log(uncerainValue + 50);
}


// Ничего не возращающий тип
function logMessage(): void {
    console.log('Hello');
}


// Типы null и undefiend
let nullable: null = null;
let undefiend: undefined = undefined;


// Тип который Никогда не возвращает значения
function example(): never {
    while (true) {
        throw new Error();
    }
}


// Коллекции
// Массив
let numberArray: number[] = [1, 2, 3, 4, 5];
let stringArray: Array<string> = ['aaaaaaa', 'sdasd', 'ssssssss', '1asdasd']

// Кортеж
let tuple: [string, number] = ['word', 24];

// Множества
let uniqueData: Set<number> = new Set([1, 2, 3, 4, 5]);

// Словари
let dictionary: Map<string, number> = new Map();
dictionary.set('first', 1);
dictionary.set('second', 1);
