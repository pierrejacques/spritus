import { Math, Shape, Fraction } from '../../src';

const { Distribution } = Math;
const { Circle } = Shape;
const { Delaunay } = Fraction;

export default (context: CanvasRenderingContext2D) => {
    const points = [];
    const pdist = Distribution.uniform(0, 0, context.canvas.width, context.canvas.height);
    for (let i = 0; i < 100; i ++) {
        points.push(pdist.generate());
    }
    const dfrac = new Delaunay(points);
    console.log(dfrac);
};
