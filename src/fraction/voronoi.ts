import { Point, Triangle } from '../geo-base';
import { Paintable } from '../interfaces';
import Delaunay from './delaunay';

export default class Voronoi implements Paintable {
    static defaultStyles = {
        strokeStyle: '#333',
    };

    static fromDelauney(delauney: Delaunay, styles: object = Voronoi.defaultStyles) {
        const circums = [];
        const edges = [];
        const n = delauney.triangles.length;
        for (let i = 0; i < n - 1; i ++) {
            const triangle1 = delauney.triangles[i];
            circums.push(triangle1.circumCenter);
            for (let j = i + 1; j < n; j ++) {
                const triangle2 = delauney.triangles[j];
                let count = 0;
                for (let a = 0; a < 3; a ++) {
                    let breakFlag = false;
                    for (let b = 0; b < 3; b ++) {
                        if (triangle1.points[a] === triangle2.points[b]) {
                            count++;
                            if (count === 2) break;
                        }
                    }
                    if (breakFlag) break;
                }
                if (count === 2) edges.push([triangle1.circumCenter, triangle2.circumCenter]);
            }
        }
        const voronoi = new Voronoi(circums, styles);
        voronoi.edges = edges;
        return voronoi;
    }

    public edges: Array<Point[]> = [];

    constructor(
        public points: Point[],
        public styles: object = Voronoi.defaultStyles,
    ) {}

    calculate() {}

    paint(context: CanvasRenderingContext2D) {
        Object.assign(context, this.styles);
        this.edges.forEach(edge => {
            context.beginPath();
            context.moveTo(edge[0].x, edge[0].y);
            context.lineTo(edge[1].x, edge[1].y);
            context.stroke();
        });
    }
}