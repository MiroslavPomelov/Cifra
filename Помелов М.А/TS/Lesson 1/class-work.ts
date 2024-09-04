//1
let sums = (a: number, b: number): number => a + b;

//2
function greet(name: string = 'Безымянный') {
    console.log(`Привет ${name}`)
}

//3
function factorial(value: number): number {
    for (let i = value; i >= 1; i--) {
        value *= i;
    }
    return value;
}


//4
function isEven(value: number): boolean {
    if (value % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}

//5
function max(a: number, b: number): number {
    if (a > b) {
        return a
    }
    else if (a == b) {
        return a;
    }
    else {
        return b;
    }
}



//6
function reverseString(string: string): string {
    let newString: string = '';
    for (let i = string.length; i >= 0; i--) {
        newString += string[i];
    }

    return newString;
}


//7
function sumArray(array: number[]): number {
    let sum: number = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum;
}



//8
function isPalindrom(palindrom: string): boolean {
    if (palindrom === reverseString(palindrom)) {
        return true;
    }
    else {
        return false;
    }
}

//9
function MathPow(...values: number[]): number[] {
    let newArray: Array<number> = new Array();
    for (let i = 0; i < values.length; i++) {
        newArray.push(Math.pow(values[i], values[values.length - 1]));
    }

    return newArray;
}