class Calculator {
    add(firstParameter: number, secondParameter: number): number;
    add(firstParameter: string, secondParameter: string): string;
    add(firstParameter: any, secondParameter: any): any {
        return firstParameter + secondParameter;
    }
}

const calc: Calculator = new Calculator();
calc.add(1,2);