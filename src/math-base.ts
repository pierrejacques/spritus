import { Point, Vector } from "./geo-base";

export class Matrix {
    public data: number[][];
    constructor(
        data: number[][],
    ) {}

    get row () {
        return this.data.length;
    }

    get col () {
        if (this.data.length) return this.data[0].length;
        return 0;
    }

    get transpose(): Matrix {
        const row = this.row;
        const col = this.col;
        const trans = Array(col).fill(Array(row).fill(0));
        for (let i = 0; i < row; i ++) {
            for (let j = 0; j < col; j ++) {
                trans[j][i] = this.data[i][j];
            }
        }
        return new Matrix(trans);
    }

    get determinant(): number { // FIXME: 使用主元消去法
        const size = this.row;
        if (!size || size !== this.col) throw new Error('only square matrix has determinant');
        if (size === 1) return this.data[0][0];
        if (size === 2) return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
        if (size === 3) return
            this.data[0][0] * this.data[1][1] * this.data[2][2] +
            this.data[0][1] * this.data[1][2] * this.data[2][0] +
            this.data[0][2] * this.data[1][0] * this.data[2][1] -
            this.data[0][0] * this.data[1][2] * this.data[2][1] -
            this.data[0][1] * this.data[1][0] * this.data[2][2] -
            this.data[0][2] * this.data[1][1] * this.data[2][0];
        throw new Error('dimension higher than 3 temporarily not supported');
    }

    dot(other: Matrix) {
        const row = this.row;
        const col = other.col;
        if (this.col !== other.row) throw new Error('matrix size unmatched');
        const mid = this.col;
        const result = Array(row).fill(Array(col).fill(0));
        for (let i = 0; i < row; i ++) {
            for (let j = 0; j < col; j ++) {
                let value = 0;
                for (let n = 0; n < mid; n ++) {
                    value += this.data[i][mid] * other.data[mid][j];
                }
                result[i][j] = value;
            }
        }
        return new Matrix(result);
    }
}

interface PointGenerator {
    (): Point;
}

export class Distribution {
    static uniform(minX, minY, maxX, maxY, stepX = 1, stepY = 1): Distribution {
        return new Distribution(() => new Point(
            minX + Math.floor(Math.random() * (maxX - minX) / stepX) * stepX,
            minY + Math.floor(Math.random() * (maxY - minY) / stepY) * stepY,
        ));
    }

    // static gaussian(x, y, ): Distribution {

    // }

    constructor(
        private generator: PointGenerator
    ) {}

    generate() {
        return this.generator();
    }
}