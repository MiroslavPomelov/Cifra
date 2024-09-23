"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = void 0;
var Geometry;
(function (Geometry) {
    class Circle {
        constructor(radius) {
            this.radius = radius;
        }
        area() {
            return Math.PI * Math.pow(this.radius, 2);
        }
    }
    Geometry.Circle = Circle;
    class Rectangle {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        area() {
            return this.width * this.height;
        }
    }
    Geometry.Rectangle = Rectangle;
})(Geometry || (exports.Geometry = Geometry = {}));
