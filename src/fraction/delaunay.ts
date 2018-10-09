import { Point } from '../geo-base';
import { Matrix } from '../alg-base';
import { ShapeReflect, Circle, Segment } from '../shapes';
import { Paintable } from '../interfaces';

/**
 * @classdesc maximize the minimum angle of all the angles of the triangles in the triangulation
 */
class DelaunayTriangle {
    adjoinTriangles: Set<DelaunayTriangle> = new Set();
    circumcircle: Circle = null;

    constructor(public points: Point[]) {
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
        const radius = center.toVector().subtract(points[0].toVector()).norm;
        this.circumcircle = new Circle(center, radius);
    }

    isAdjoinWidth(other: DelaunayTriangle) {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.points[i] === other.points[i]) {
                    count ++;
                };
            }
            // skip further checking
            if (i === 1 && count === 0) break;
        }
        return count === 2;
    }

    has(point: Point) {
        return this.points.includes(point);
    }

    get edges() {
        return [
            new Segment(this.points[0], this.points[1]),
            new Segment(this.points[1], this.points[2]),
            new Segment(this.points[2], this.points[0]),
        ];
    }
}

// TODO: make it expandable
export default class Delaunay implements Paintable {
    triangles: DelaunayTriangle[] = [];
    edges: Set<Segment> = new Set();

    constructor(public points: Point[]) {
        if (points.length < 2) throw new Error('delaunay triangulation requires more than 1 points');
        this.bowyerWatson(points);
    }

    private bowyerWatson(points: Point[]) {
        // calculate bbox
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
        const superVertex = [
            new Point((minX + maxX) / 2, minY - width / 2),
            new Point(minX - height, maxY),
            new Point(maxX + height, maxY),
        ]
        this.pushTriangles(points[0], superVertex);

        // push in other points
        points.forEach((point) => {
            const trianglesToDestroy = [];
            const newLinks = new Set();
            const n = this.triangles.length;
            for (let j = 1; j < n; j ++) {
                const triangle = this.triangles[j];
                if (triangle.circumcircle.contains(point)) {
                    trianglesToDestroy.push(triangle);
                    triangle.points.forEach(p => {
                        newLinks.add(p);
                    });
                    if (trianglesToDestroy.length === 2) break;
                }
            }
            console.log(trianglesToDestroy.length); // TODO: 理论上讲应该都是2
            trianglesToDestroy.forEach(triangle => {
                this.triangles.splice(this.triangles.indexOf(triangle), 1);
            });
            this.pushTriangles(point, [...newLinks]);
        });

        // remove vertex from super triangle
        this.triangles = this.triangles.filter((triangle) => {
            superVertex.every(superP => triangle.points.every(point => point !== superP));
        });
        this.triangles.forEach((triangle) => {
            triangle.edges.forEach(this.edges.add);
        });
    }

    pushTriangles(newPoint: Point, points: Point[]) {
        const n = points.length;
        for (let i = 0; i < n; i ++) {
            this.triangles.push(new DelaunayTriangle([
                newPoint,
                points[i],
                points[i === n - 1 ? 0 : i + 1],
            ]));
        }
    }

    paint(context) {
        this.edges.forEach(edge => {
            edge.paint(context);
        });
    }
}
