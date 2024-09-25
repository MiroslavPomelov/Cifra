// // Spread
// let arr: Array<number> = [1, 2, 3, 4, 5];
// let second: Array<number> = [...arr, 6, 7, 8];

// let someObj: { name: string, age: number } = {
//     name: "Valeriy",
//     age: 34
// }

// let secondObj: { name: string, age: number, eyeColor: string, height: number } = {
//     ...someObj,
//     eyeColor: 'green',
//     height: 178.6
// }




// // Rest
// function sum(...numbers: number[]): number {
//     let sum: number = 0;

//     numbers.forEach((number) => {
//         sum += number;
//     })

//     return sum;
// }

// sum(1, 2, 3, 4, 5, 6);





// // Keyof
// type Person = {
//     name: string;
//     age: number;
// }

// type PersonKeys = keyof Person; // name | age



// // Typeof
// let str = 'Hello';
// let numbr = 34;

// type StrType = typeof str;
// type NumrType = typeof numbr;

// function func(params: typeof str): typeof numbr {
//     return 37;
// }






//----------------------------------------------------------------------------


abstract class Person {
    public abstract name: string;
    public abstract age: number;
    public abstract eyeColor: string;
    public abstract height: string;
    public abstract weight: string;
    public abstract level: string;


    getInfo(): string {
        return "Human"
    }
}


class Human extends Person {
    public name: string;
    public age: number;
    public eyeColor: string;
    public height: string;
    public weight: string;
    public level: string;

    constructor(name: string, age: number, eyecolor: string, height: string, weight: string, level: string) {
        super();
        this.name = name;
        this.age = age;
        this.eyeColor = eyecolor;
        this.height = height;
        this.weight = weight;
        this.level = level;
    }

    getInfo(): string {
        return `${this.name} ${this.age} ${this.eyeColor}`
    }
}


class NewHuman extends Person {
    public name: string;
    public age: number;
    public eyeColor: string;
    public height: string;
    public weight: string;
    public level: string;

    constructor(name: string, age: number, eyecolor: string, height: string, weight: string, level: string) {
        super();
        this.name = name;
        this.age = age;
        this.eyeColor = eyecolor;
        this.height = height;
        this.weight = weight;
        this.level = level;
    }

    getInfo(): string {
        return `${this.name} ${this.age} ${this.eyeColor}`
    }
}



































/**
 * Базовый интерфейс Компонента определяет поведение, которое изменяется
 * декораторами.
 */
interface Component {
    operation(): string;
}

/**
 * Конкретные Компоненты предоставляют реализации поведения по умолчанию. Может
 * быть несколько вариаций этих классов.
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * Базовый класс Декоратора следует тому же интерфейсу, что и другие компоненты.
 * Основная цель этого класса - определить интерфейс обёртки для всех конкретных
 * декораторов. Реализация кода обёртки по умолчанию может включать в себя поле
 * для хранения завёрнутого компонента и средства его инициализации.
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * Декоратор делегирует всю работу обёрнутому компоненту.
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Конкретные Декораторы вызывают обёрнутый объект и изменяют его результат
 * некоторым образом.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Декораторы могут вызывать родительскую реализацию операции, вместо того,
     * чтобы вызвать обёрнутый объект напрямую. Такой подход упрощает расширение
     * классов декораторов.
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

/**
 * Декораторы могут выполнять своё поведение до или после вызова обёрнутого
 * объекта.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

/**
 * Клиентский код работает со всеми объектами, используя интерфейс Компонента.
 * Таким образом, он остаётся независимым от конкретных классов компонентов, с
 * которыми работает.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * Таким образом, клиентский код может поддерживать как простые компоненты...
 */
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...так и декорированные.
 *
 * Обратите внимание, что декораторы могут обёртывать не только простые
 * компоненты, но и другие декораторы.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);