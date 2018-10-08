import { Point, Vector, Projection } from '../geo-base';
import { Matrix } from '../alg-base';
import Circle from './circle';

export default class ShapeReflect {
    static getCircumscribe(points: Point[]): Circle {
        const baseMatrix = new Matrix([
            [1, points[0].x, points[0].y],
            [1, points[1].x, points[1].y],
            [1, points[2].x, points[2].y],
        ]);
        const base = 2 * baseMatrix.determinant;
        const norm0 = points[0].toVector().norm;
        const norm1 = points[1].toVector().norm;
        const norm2 = points[2].toVector().norm;
        const xMatrix = new Matrix([
            [1, points[0].x, norm0],
            [1, points[1].x, norm1],
            [1, points[2].x, norm2],
        ]);
        const yMatrix = new Matrix([
            [1, points[0].y, norm0],
            [1, points[1].y, norm1],
            [1, points[2].y, norm2],
        ]);
        const center = new Point(xMatrix.determinant / base, yMatrix.determinant / base);
        const radius = center.toVector().substract(points[0].toVector());
        return new Circle(center, radius);
    }
}
