"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multipliar = exports.Divider = exports.Sumator = void 0;
class Sumator {
    sum(numerOne, numerTwo) {
        return numerOne + numerTwo;
    }
}
exports.Sumator = Sumator;
class Divider {
    divide(numerOne, numerTwo) {
        if (numerTwo === 0) {
            console.error("Jib,rf");
        }
        else {
            console.log(numerOne / numerTwo);
        }
    }
}
exports.Divider = Divider;
class Multipliar {
    multipliar(numerOne, numerTwo) {
        return numerOne * numerTwo;
    }
}
exports.Multipliar = Multipliar;
