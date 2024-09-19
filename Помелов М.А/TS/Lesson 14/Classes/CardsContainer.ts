

class CardsContainer {
    element: HTMLElement;
    array: Array<GoodCard>;

    constructor(element: HTMLElement, array: Array<GoodCard>) {
        this.element = element;
        this.array = array;
    }

    append(): void {
        for (let i = 0; i < this.array.length; i++) {
            this.element.appendChild(this.array[i].draw(this.element));
        }
    }
}


let card1: GoodCard = new GoodCard('Компьютер', 'dsadasdasdasdasdasd', 27999, '/game_console.png');
let newArray: GoodCard[] = new Array<GoodCard>;

newArray.push(card1);
const parentss: HTMLElement = document.getElementById("parentss")!;
let container: CardsContainer = new CardsContainer(parentss, newArray);
container.append();