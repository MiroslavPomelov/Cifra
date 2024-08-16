//Прямоугольный треугольник:

export function rightTriangleArea(base, height) {
    return Math.sqrt(0.5 * base * height)
}

export function rightTriangleHypotenuse(side1, side2) {
    return Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2))
}

// Равносторонний треугольник:
export function equilateralTriangleArea(side) {
    return Math.sqrt((Math.sqrt(3) / 4) * Math.pow(side, 2))
}

export function equilateralTrianglePerimeter(side) {
    return 3 * side;
}


// Произвольный треугольник:
export function triangleArea(side1, side2, side3) {
    const p = (side1 + side2 + side3) / 2;
    return Math.sqrt(p * (p - side1) * (p - side2) * (p - side3))
}

export function trianglePerimeter(side1, side2, side3) {

    return side1 + side2 + side3;
}