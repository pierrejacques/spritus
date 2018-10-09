import Shape from './shape';
import { Paintable } from '../interfaces';
import { Vector, Point, Projection } from '../geo-base';

export default class Segment extends Shape implements Paintable {
    static defaultStyles = {
        strokeStyle: '#333',
    };

    constructor(
        public start: Point,
        public end: Point,
        private styles: Object = Segment.defaultStyles,
    ) {
        super();
    }

    paint(context: CanvasRenderingContext2D) {
        context.save();
        Object.assign(context, this.styles);
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
        context.restore();
    }

    project(axis: Vector) {
        const startScalar = this.start.toVector().dot(axis);
        const endScalar = this.end.toVector().dot(axis);
        return startScalar > endScalar ? new Projection(endScalar, startScalar) : new Projection(startScalar, endScalar);
    }

    getAxes() {
        return [
            this.start.toVector().subtract(this.end.toVector()).normal()
        ];
    }

    contains(point: Point) {
        return (
            (point.x - this.start.x) * (point.x - this.end.x) < 0 || (point.y - this.start.y) * (point.y - this.end.y) < 0
        ) && Math.abs(
            (point.x - this.start.x) * (point.y - this.end.y) - (point.x - this.end.x) * (point.y - this.start.y)
        ) < Number.EPSILON
    }

    equals(other: Segment) {
        const EPSILON = Number.EPSILON;
        const fwv1 = Vector.zero();
        const fwv2 = Vector.zero();
        return (
            this.start.toVector(fwv1).subtract(other.start.toVector(fwv2)).norm < EPSILON &&
            this.end.toVector(fwv1).subtract(other.end.toVector(fwv2)).norm < EPSILON
        ) || (
            this.start.toVector(fwv1).subtract(other.end.toVector(fwv2)).norm < EPSILON &&
            this.end.toVector(fwv1).subtract(other.start.toVector(fwv2)).norm < EPSILON
        );
    }

    middle() {
        return new Point(
          (this.start.x + this.end.x) / 2,
          (this.start.y + this.end.y) / 2,
        );
    }
}
