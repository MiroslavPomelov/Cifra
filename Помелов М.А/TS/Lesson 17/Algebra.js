"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algebra = void 0;
var Algebra;
(function (Algebra) {
    function solveQuadratic(a, b, c) {
        let discriminant = Math.pow(b, 2) - 4 * a * c;
        let root1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b + Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2];
    }
    Algebra.solveQuadratic = solveQuadratic;
})(Algebra || (exports.Algebra = Algebra = {}));
