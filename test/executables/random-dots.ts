import { Geo, Math, Shape, Fraction } from '../../src';

const { Point } = Geo;
const { Distribution } = Math;
const { Circle } = Shape;
const { Delaunay } = Fraction;

export default (context: CanvasRenderingContext2D) => {
    const points = [];
    const dist = Distribution.uniform(0, 0 , context.canvas.width, context.canvas.height);
    for (let i = 0; i < 300; i ++) {
        points.push(new Point(dist.generate()));
    }
    const dfrac = new Delaunay(points, { strokeStyle: '#f88' });
    dfrac.paint(context);
};
