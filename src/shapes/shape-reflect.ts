import { Point, Vector, Projection } from '../geo-base';
import { Matrix } from '../alg-base';
import Round from './round';

export default class ShapeReflect {
    static getCircumscribe(points: Point[]): Round {
        const baseMatrix = new Matrix([
            [1, points[0].x, points[0].y],
            [1, points[1].x, points[1].y],
            [1, points[2].x, points[2].y],
        ]);
    }

    static getInscribed(points: Point[]): Round {

    }
}
