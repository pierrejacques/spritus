import Shape from './shape';
import { Paintable } from '../interfaces';
import { Vector, Point, Projection } from '../geo-base';

export default class Circle extends Shape implements Paintable {
    static defaultStyles = {
        strokeStyle: '#333',
    };

    constructor(
        public center: Point,
        public radius: number,
        private styles: Object = Circle.defaultStyles,
    ) {
        super();
    }

    paint(context: CanvasRenderingContext2D) {
        context.save();
        Object.assign(context, this.styles);
        context.beginPath();
        context.moveTo(this.center.x, this.center.y);
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI);
        context.stroke();
        context.restore();
    }

    collidesWith(other: Shape) {
        if (other instanceof Circle) {
            const { center, radius } = (other as Circle);
            return center.toVector().subtract(this.center).norm < (this.radius + radius);
        }
        return super.collidesWith(other);
    }

    project(axis: Vector) {
        const centerScala = this.center.toVector().dot(axis);
        return new Projection(centerScala - this.radius, centerScala + this.radius);
    }

    getAxes() {
        return [];
    }

    contains(point: Point) {
        return point.toVector().subtract(this.center.toVector()).norm < this.radius;
    }
}
