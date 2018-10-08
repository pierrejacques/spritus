export class Matrix {
    constructor(
        public data: number[][],
    ) {}

    get row () {
        return this.data.length;
    }

    get col () {
        if (this.data.length) return this.data[0].length
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

    get determinant(): number { // TODO: 主元消去法
        return 0;
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
