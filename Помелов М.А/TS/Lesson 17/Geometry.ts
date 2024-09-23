export namespace Geometry {
    export class Circle {
        constructor(public radius: number) { }

        public area(): number {
            return Math.PI * Math.pow(this.radius, 2);
        }
    }

    export class Rectangle {
        constructor(public width: number, public height: number) { }

        public area(): number {
            return this.width * this.height;
        }


    }

}
