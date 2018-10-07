import Shape from './shape';
import { getOffscreenContext } from '../utils';
import { Paintable } from '../interfaces';
import { Point, Vector, Projection } from '../geo-base';

/**
 * @alias fwv=flyWeightVector
 */
export default class Polygon extends Shape implements Paintable {
    static defaultStyles = {
        fillStyle: '#AAA',
        strokeStyle: '#333',
    };

    constructor(
        private points: Point[] = [],
        private styles: Object = Polygon.defaultStyles,
    ) {
        super();
    }

    project(axis: Vector) {
        let min = Infinity;
        let max = -Infinity;
        const fwv = Vector.zero();
        this.points.map((point) => {
            const scalar = point.toVector(fwv).dot(axis);
            if (scalar > max) {
                max = scalar;
            }
            if (scalar < min) {
                min = scalar;
            }
        });
        return new Projection(min, max);
    }

    getAxes() {
        const axes = [];
        const fwv1 = Vector.zero();
        const fwv2 = Vector.zero();
        for (let i = 0; i < this.points.length - 1; i ++) {
            this.points[1].toVector(fwv1);
            this.points[2].toVector(fwv2);
            axes.push(fwv1.subtract(fwv2).normal());
        }
        return axes;
    }

    contains(point: Point) {
        const context = getOffscreenContext();
        this.createPath(context);
        return context.isPointInPath(point.x, point.y);
    }

    paint(context: CanvasRenderingContext2D) {
        context.save();
        Object.assign(context, this.styles);
        this.createPath(context);
        context.fill();
        context.stroke();
        context.restore();
    }

    createPath(context: CanvasRenderingContext2D) {
        if (this.points.length < 2) return;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach((point) => {
            context.lineTo(point.x, point.y);
        });
        context.closePath();
    }

    addPoint(point: Point) {
        this.points.push(point);   
    }

    setStyles(styles: Object, merge: boolean = true) {
        if (merge) {
            Object.assign(this.styles, styles);
        } else {
            this.styles = styles;
        }
    }
}
