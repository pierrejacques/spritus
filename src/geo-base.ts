import { Coord } from './interfaces';
import { Matrix } from './math-base';

export class Point implements Coord {
    static origin() {
        return new Point(0, 0);
    }

    static distance(p1: Coord, p2: Coord) {
        return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5;
    }

    x: number;
    y: number;

    constructor(
        x: number | Coord,
        y?: number,
    ) {
        if (typeof x === 'number') {
            if (typeof y !== 'number') throw new Error('param absence');
            this.x = x;
            this.y = y;
            return;
        }
        this.x = x.x;
        this.y = x.y;
    }

    toVector(v?: Vector) {
        if (v) { // 便于实现Vector的享元
            v.x = this.x;
            v.y = this.y;
            return v;
        }
        return new Vector(this.x, this.y);
    }
}

export class Projection {
    constructor(
        public min: number,
        public max: number,
    ) {}

    overlaps(other: Projection) {
        // o = this; | = other;
        if (this.min > other.max || this.max < other.min) return 0; // separated
        if (this.max > other.max && this.min < other.min) return other.max - other.min; // o-|--|-o
        if (this.max < other.max && this.min > other.min) return this.max - this.min; // |-o--o-|
        if (this.min < other.min) return this.max - other.min; // o-|--o-|
        return other.max - this.min; // |--o-|-o
    }
}

export class Vector {
    static zero() {
        return new Vector(0, 0);
    }

    static unit() {
        return new Vector(1, 1);
    }

    constructor(
        public x: number,
        public y: number,
    ) {}

    get norm() {
        return (this.x ** 2 + this.y ** 2) ** 0.5;
    }

    add(other: Vector) {
        return new Vector(
            this.x + other.x,
            this.y + other.y,
        );
    }

    subtract(other: Vector) {
        return new Vector(
            this.x - other.x,
            this.y - other.y,
        );
    }

    dot(other: Vector) {
        return this.x * other.x + this.y * other.y;
    }

    scale(ratio: number) {
        return new Vector(this.x * ratio, this.y * ratio);
    }

    normalize() {
        const m = this.norm;
        return new Vector(
            this.x / m,
            this.y / m,
        );
    }

    perpendicular(clockwise = true) {
        return new Vector(
            clockwise ? this.y : -this.y,
            clockwise ? -this.x : this.x,
        );
    }

    normal() {
        return this.perpendicular().normalize();
    }
}

export class Triangle {
    circumCenter: Point;
    circumRadius: number;

    constructor(
        public points: Point[]
    ) {
        const dx01 = 2 * (points[0].x - points[1].x);
        const dy01 = 2 * (points[0].y - points[1].y);
        const dx02 = 2 * (points[0].x - points[2].x);
        const dy02 = 2 * (points[0].y - points[2].y);
        const r0 = points[0].x ** 2 + points[0].y ** 2;
        const r1 = points[1].x ** 2 + points[1].y ** 2;
        const r2 = points[2].x ** 2 + points[2].y ** 2;
        const dr01 = r0 - r1;
        const dr02 = r0 - r2;

        const D = new Matrix([
            [dx01, dy01],
            [dx02, dy02],
        ]).determinant;
        const Dx = new Matrix([
            [dr01, dy01],
            [dr02, dy02],
        ]).determinant;
        const Dy = new Matrix([
            [dx01, dr01],
            [dx02, dr02],
        ]).determinant;
        this.circumCenter = new Point(Dx / D, Dy / D);
        this.circumRadius = Point.distance(this.circumCenter, points[0]);
    }
}
