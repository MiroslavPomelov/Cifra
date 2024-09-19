class Printer {
    print(value: string): void;
    print(value: number): void;
    print(value: any): void {
        if (typeof (value) == "string") {

        }
        console.log(value);
    }
}



// Параметрический полимофризм
class Box<T> {
    private _context: T;

    constructor(context: T) {
        this._context = context;
    }

    public getContext(): T {
        return this._context;
    }
}

let stringBox: Box<string> = new Box<string>('32');
let intBox: Box<number> = new Box<number>(3.5);

console.log(stringBox.getContext());
console.log(intBox.getContext());




//Подтипов полиморфизм

// abstract class Animal {
//     abstract makeSound(): void;
// }

class Animal {
    makeSound(): void {

    };
}

class Dog extends Animal {
    makeSound(): void {
        console.log('Ooof');
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log('Mew');
    }
}

class Daragon {
    makeSound(): void {
        console.log('Aoaoaoa');
    }
}

function makeAnimalMakeSound(animal: Animal): void {
    animal.makeSound();
}

let dog: Dog = new Dog();
let cat: Cat = new Cat();

makeAnimalMakeSound(dog);
makeAnimalMakeSound(cat);

makeAnimalMakeSound(new Daragon());


let anim: Animal = new Animal();

let doooog: Dog = anim as Dog;