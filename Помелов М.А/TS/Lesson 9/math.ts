export class Sumator {

    sum(numerOne: number, numerTwo: number): number {
        return numerOne + numerTwo;
    }
}

export class Divider {

    divide(numerOne: number, numerTwo: number): void {
        if (numerTwo === 0) {
            console.error("Jib,rf");
        }
        else {

            console.log(numerOne / numerTwo);
        }

    }
}

export class Multipliar {

    multipliar(numerOne: number, numerTwo: number): number {
        return numerOne * numerTwo;
    }
}