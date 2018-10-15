import { Geo, Math, Shape, Fraction } from '../../src';

const { Point } = Geo;
const { Distribution } = Math;
const { Circle } = Shape;
const { Delaunay, Voronoi } = Fraction;

export default (context: CanvasRenderingContext2D) => {
    const points = [];
    // const dist = Distribution.uniform(
    //     0,
    //     0,
    //     context.canvas.width,
    //     context.canvas.height,
    // );
    const dist = Distribution.gaussian2D(
        context.canvas.width / 2,
        context.canvas.height / 2,
        500,
        500,
    );
    for (let i = 0; i < 2000; i ++) {
        points.push(new Point(dist.generate()));
    }
    const delaunay = new Delaunay(points);
    delaunay.calculate();
    // delaunay.paint(context);
    const voronoi = Voronoi.fromDelauney(delaunay);
    voronoi.paint(context);
};
