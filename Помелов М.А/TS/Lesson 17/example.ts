import { Geometry } from './Geometry';
import { Algebra } from './Algebra';


let circle: Geometry.Circle = new Geometry.Circle(10);
console.log(circle.area());

let rectangle: Geometry.Rectangle = new Geometry.Rectangle(10, 20);
console.log(rectangle.area());

let roots: [number, number] = Algebra.solveQuadratic(1, -3, 2);
console.log(roots[0]);
console.log(roots[1]);