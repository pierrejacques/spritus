import Shape from './shape';
import { Paintable } from '../interfaces';
import { Vector, Point, Projection } from '../geo-base';

export default class Round extends Shape implements Paintable {
    static defaultStyles = {
        strokeStyle: '#333',
    };

    constructor(
        public center: Point,
        public radius: number,
        private styles: Object = Round.defaultStyles,
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

    project(axis: Vector) {
        const centerScala = this.center.toVector().dot(axis);
        return new Projection(centerScala - this.radius, centerScala + this.radius);
    }

    getAxes() { // TODO: how?
        return [];
    }

    contains(point: Point) {
        return point.toVector().subtract(this.center.toVector()).norm < this.radius;
    }
}