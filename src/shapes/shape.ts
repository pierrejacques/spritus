import { Point, Vector, Projection } from '../geo-base';

export default abstract class Shape {
    minTrans(other: Shape): Vector {
        let min = Infinite;
        let mtv = null;
        [...this.getAxes(), ...other.getAxes()].forEach(axis => {
            const overlap = this.project(axis).overlaps(other.project(axis);
            if (overlap > 0 && overlap < min) {
                min = overlap;
                mtv = axis.scale(overlap);
            }
        });
        return mtv || Vector.zero();
    }

    abstract getAxes(): Vector[];
    abstract project(axis: Vector): Projection;
    abstract contains(point: Point): boolean;
}
