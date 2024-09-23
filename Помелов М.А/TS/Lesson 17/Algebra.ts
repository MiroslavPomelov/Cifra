export namespace Algebra {
    export function solveQuadratic(a: number, b: number, c: number): [number, number] {
        let discriminant: number = Math.pow(b, 2) - 4 * a * c;
        let root1: number = (-b - Math.sqrt(discriminant)) / (2 * a);
        let root2: number = (-b + Math.sqrt(discriminant)) / (2 * a);

        return [root1, root2];
    }
}