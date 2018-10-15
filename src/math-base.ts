import { Coord } from './interfaces';

export class Matrix {
    static create(x: number, y: number, generate: (i: number, j: number) => number) {
        const data = [];
        for (let i = 0; i < x; i ++) {
            const row = [];
            for (let j = 0; j < y; j ++) {
                row.push(generate(i, j));
            }
            data.push(row);
        }
        return new Matrix(data);
    }

    static zeros(x: number, y: number) {
        return Matrix.create(x, y, () => 0);
    }

    static ones(x: number, y: number) {
        return Matrix.create(x, y, () => 1);
    }

    static unit(n: number) {
        return Matrix.create(n, n, (i, j) => i === j ? 1 : 0); 
    }

    constructor(
        public data: number[][],
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
        return Matrix.create(col, row, (i, j) => this.data[j][i]);
    }

    get determinant(): number { // TODO: 使用主元消去法
        const size = this.row;
        if (!size || size !== this.col) throw new Error('only square matrix has determinant');
        if (size === 1) return this.data[0][0];
        let result = 0;
        for (let i = 0; i < size; i ++) {
            const sign = i % 2 === 0 ? 1 : -1;
            result += sign * this.data[0][i] * this.minor(0, i).determinant;
        }
        return result;
    }

    dot(other: Matrix) {
        const row = this.row;
        const col = other.col;
        if (this.col !== other.row) throw new Error('matrix size unmatched');
        const mid = this.col;
        return Matrix.create(row, col, (i, j) => {
            let value = 0;
            for (let n = 0; n < mid; n ++) {
                value += this.data[i][mid] * other.data[mid][j];
            }
            return value;
        });
    }

    times(value: number) {
        this.data.forEach(row => row.forEach(cell => cell *= value));
        return this;
    }

    sub(rows: number[], cols: number[]) {
        const n = rows.length;
        const m = cols.length;
        return Matrix.create(n, m, (i, j) => this.data[rows[i]][cols[j]]);
    }

    subRows(rows: number[]) {
        return Matrix.create(rows.length, this.col, (i, j) => this.data[rows[i]][j]);
    }

    subCols(cols: number[]) {
        return Matrix.create(this.row, cols.length, (i, j) => this.data[i][cols[j]]);
    }

    minor(x: number, y: number) {
        const size = this.row;
        if (size <= 1 || size !== this.col) throw new Error('only square matrix with size greater than 1 has minor matrices');
        const rows = [];
        const cols = [];
        for (let i = 0; i < size; i ++) {
            if (i !== x) rows.push(i)
            if (i !== y) cols.push(i)
        }
        return this.sub(rows, cols);
    }
}

interface Generator {
    (): Coord | number;
}

interface DensityFunction {
    (x: number, y: number): number;
}

interface GeneratorOptions {
    minX?: number,
    minY?: number,
    rangeX?: number,
    rangeY?: number,
    limit?: number,
}

export class Distribution {
    static uniform(minX, minY, maxX, maxY, stepX = 1, stepY = 1) {
        return new Distribution(() => ({
            x: minX + Math.floor(Math.random() * (maxX - minX) / stepX) * stepX,
            y: minY + Math.floor(Math.random() * (maxY - minY) / stepY) * stepY,
        }));
    }

    // static follows(func: DensityFunction, options?: GeneratorOptions) {
    //     const opt = Object.assign({
    //         minX: 0,
    //         minY: 0,
    //         rangeX: 1,
    //         rangeY: 1,
    //         limit: 1000,
    //     }, options);
    //     return new Distribution(() => {
    //         let x, y, prob, rand, count = 0;
    //         do {
    //             count++
    //             x = opt.minX + opt.rangeX * Math.random();
    //             y = opt.minY + opt.rangeY * Math.random();
    //             prob = func(x, y);
    //             rand = Math.random();
    //         } while ((prob > 0 && count > opt.limit) || prob < rand)
    //         return { x, y };
    //     });
    // }

    static gaussian2D(cx: number, cy: number, rx: number, ry: number = rx) {
        const xGaussian = Distribution.gaussian(cx, rx);
        const yGaussian = Distribution.gaussian(cy, ry);
        return new Distribution(() => ({
            x: xGaussian.generate() as number,
            y: yGaussian.generate() as number,
        }));
    }

    static gaussian(miu: number, sigma: number) {
        return new Distribution(() => {
            const u1 = Math.random();
            const u2 = Math.random();
            const value = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            return value * sigma + miu;
        });
    }

    constructor(
        private generator: Generator
    ) {}

    generate() {
        return this.generator();
    }
}