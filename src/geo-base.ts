export class Point {
    static origin() {
        return new Point(0, 0);
    }

    constructor(
        public x: number,
        public y: number,
    ) {}

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
        return this.max > other.min && this.min < other.max;
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
