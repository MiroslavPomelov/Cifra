//Circle
import { circleArea, circleCircumference } from './geometry/circle.js';

console.log(circleArea(25));
console.log(circleCircumference(25));


//Square
import { rectangleArea, rectanglePerimeter } from './geometry/square.js';

console.log(rectangleArea(7, 5));
console.log(rectanglePerimeter(10, 5));



//Triangle
import { rightTriangleArea, rightTriangleHypotenuse, equilateralTriangleArea, equilateralTrianglePerimeter, triangleArea, trianglePerimeter } from './geometry/triangle.js';

console.log(rightTriangleArea(10, 3));
console.log(rightTriangleHypotenuse(25, 18));

console.log(equilateralTriangleArea(34));
console.log(equilateralTrianglePerimeter(17));

console.log(triangleArea(17, 20, 30));
console.log(trianglePerimeter(17, 20, 30));


function drawRectangle() {
    for (let index = 0; index < 1; index++) {
        console.log("-" + "-" + "-" + "-" + "-" + "-");
        console.log("|");
        console.log("-" + "-" + "-" + "-" + "-" + "-");
    }

    context.rect(5, 10, 5, 10);
}

drawRectangle();