"use strict";
class CardsContainer {
    constructor(element, array) {
        this.element = element;
        this.array = array;
    }
    append() {
        for (let i = 0; i < this.array.length; i++) {
            this.element.appendChild(this.array[i].draw(this.element));
        }
    }
}

let card1 = new GoodCard('Компьютер', 'dsadasdasdasdasdasd', 27999, '/game_console.png');
let newArray = new Array;
newArray.push(card1);
const parentss = document.getElementById("parentss");
let container = new CardsContainer(parentss, newArray);
container.append();
