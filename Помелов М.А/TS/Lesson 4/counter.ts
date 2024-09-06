class Counter {
    value: number = 0;

    constructor() {
    }

    add(): void;
    add(value: number): void;
    add(value?: number): void {
        if (value === undefined) {
            this.value++
        }
        else {
            this.value += value;
        }

        console.log(this.value);
    }


}

const count: Counter = new Counter();

count.add();