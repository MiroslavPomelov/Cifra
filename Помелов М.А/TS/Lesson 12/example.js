"use strict";
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
var Fruits;
(function (Fruits) {
    Fruits[Fruits["apple"] = 1] = "apple";
    Fruits[Fruits["grape"] = 2] = "grape";
    Fruits[Fruits["waterlemon"] = 5] = "waterlemon";
    Fruits[Fruits["lemon"] = 3] = "lemon";
    Fruits[Fruits["orange"] = 1] = "orange";
    Fruits[Fruits["plum"] = 2] = "plum";
})(Fruits || (Fruits = {}));
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
    constructor(weight) {
        this.weight = weight;
    }
    getDescription(fruit) {
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
let weight = new Weight(3);
console.log(weight.getDescription(Fruits.waterlemon));
