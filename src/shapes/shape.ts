import { Point, Vector, Projection } from '../geo-base';

export default abstract class Shape {
    collidesWith(other: Shape) { // FIXME: 圆形的情况
        return [...this.getAxes(), ...other.getAxes()].every(axis => 
            this.project(axis).overlaps(other.project(axis))
        );
    }

    abstract getAxes(): Vector[];
    abstract project(axis: Vector): Projection;
    abstract contains(point: Point): boolean;
}
