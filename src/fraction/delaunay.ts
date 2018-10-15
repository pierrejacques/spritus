import { Point, Triangle } from '../geo-base';
import { Paintable } from '../interfaces';

/**
 * @classdesc maximize the minimum angle of all the angles of the triangles in the triangulation
 */
// TODO: make it expandable
export default class Delaunay implements Paintable {
    static defaultStyles = {
        strokeStyle: '#333',
    };

    public triangles: Triangle[] = [];

    constructor(
        public points: Point[],
        public styles = Delaunay.defaultStyles
    ) {
        if (points.length < 2) throw new Error('delaunay triangulation requires more than 1 points');
    }

    calculate() {
        const points = this.points;
        let minX = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        points.forEach(({ x, y }) => {
            if (x > maxX) maxX = x;
            if (x < minX) minX = x;
            if (y > maxY) maxY = y;
            if (y < minY) minY = y;
        })
        const width = maxX - minX;
        const height = maxY - minY;

        // create super triangle
        const MARGIN = 100;
        const superVertex = [
            new Point((minX + maxX) / 2, minY - width / 2 - MARGIN),
            new Point(minX - height - MARGIN, maxY + MARGIN),
            new Point(maxX + height + MARGIN, maxY + MARGIN),
        ];
        this.triangles.push(new Triangle([points[0], superVertex[0], superVertex[1]]));
        this.triangles.push(new Triangle([points[0], superVertex[1], superVertex[2]]));
        this.triangles.push(new Triangle([points[0], superVertex[0], superVertex[2]]));

        // push in other points
        for (let i = 1; i < points.length; i ++) {
            const point = points[i];
            const badTriangles = [];

            // find bas triangles
            this.triangles.forEach((triangle) => {
                if (Point.distance(triangle.circumCenter, point) < triangle.circumRadius) {
                    badTriangles.push(triangle);
                }
            });

            const borderEdges = [];
            badTriangles.forEach(triangle => {
                this.triangles.splice(this.triangles.indexOf(triangle), 1); // remove bad triangles
                for (let j = 0; j < 3; j++) {
                    const edge = [triangle.points[j], triangle.points[j === 2 ? 0 : j + 1]];
                    const index = borderEdges.findIndex(e => e[0] === edge[0] && e[1] ===edge[1] || e[0] === edge[1] && e[1] === edge[0])
                    if (index !== -1) {
                        borderEdges.splice(index, 1); // 由于一条边最多重合一次，故这样做没问题
                    } else {
                        borderEdges.push(edge);
                    }
                }
            });

            borderEdges.forEach(([p1, p2]) => {
                this.triangles.push(new Triangle([point, p1, p2]));
            });
        }

        // remove vertex from super triangle
        this.triangles = this.triangles.filter((triangle) => 
            superVertex.every(superP => 
                triangle.points.every(point => point !== superP)
            )
        );
    }

    paint(context: CanvasRenderingContext2D) {
        // 外接圆圆心
        // this.triangles.forEach(triangle => {
        //     const center = triangle.circumCenter;
        //     context.moveTo(center.x, center.y);
        //     context.beginPath();
        //     context.strokeStyle = '#cce';
        //     context.arc(center.x, center.y, triangle.circumRadius, 0, Math.PI * 2);
        //     context.stroke();
        // });
        this.triangles.forEach((triangle) => {
            Object.assign(context, this.styles);
            const p = triangle.points;
            context.beginPath();
            context.moveTo(p[0].x, p[0].y);
            context.lineTo(p[1].x, p[1].y);
            context.lineTo(p[2].x, p[2].y);
            context.closePath();
            context.stroke();
        });
    }
}
