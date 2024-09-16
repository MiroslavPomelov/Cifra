// enum WeekDay {
//     Monday,
//     Tuesday,
//     Wednesday,
//     Thursday,
//     Friday,
//     Saturday,
//     Sunday
// }

// let day: WeekDay = WeekDay.Friday;
// console.log(day);

// function isWeekend(day: WeekDay): boolean {
//     return day === WeekDay.Saturday || day === WeekDay.Sunday;
// }

// console.log(isWeekend(WeekDay.Monday));
// console.log(isWeekend(WeekDay.Saturday));



enum Fruits {
    apple = 1,
    grape = 2,
    waterlemon = 5,
    lemon = 3,
    orange = 1,
    plum = 2
}

// let myFavoriteFruit = Fruits.waterlemon;

// console.log(myFavoriteFruit);

// 3

// let array: Array<Fruits> = [Fruits.apple, Fruits.grape, Fruits.lemon, Fruits.orange, Fruits.plum, Fruits.waterlemon];


// let randomFruit: number = Math.floor(Math.random() * 6) + 1;

// console.log(array[randomFruit]);






// 4

// function favoriteOrange(fruit: Fruits): void {
//     switch (fruit) {
//         case Fruits.orange:
//             console.log(`${fruit} мой любимый фрукт`);
//             break;

//         default:
//             console.log("Пусто");
//             break;
//     }
// }

// favoriteOrange(Fruits.orange);


// 6

class Weight {
    weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }

    getDescription(fruit: Fruits): string {
        switch (fruit) {
            case Fruits.lemon:
                return "Кислый фрукт";
                break;

            default:
                return "Сладкий фрукт";
                break;
        }
    }
}


let weight: Weight = new Weight(3);
console.log(weight.getDescription(Fruits.waterlemon));
