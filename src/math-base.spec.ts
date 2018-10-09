import { Matrix } from './math-base';

describe('Matrix' () => {
    const m = new Matrix([[1, 2], [3, 4], [5, 6]]);
    it('should have the right row & col value', () => {
        expect(m.row).to.be.equal(3);
        expect(m.col).to.be.equal(2);
    });

    it('should perform right when tranpose', () => {
        const m2 = m.transpose;
        expect(m2.row).to.be.equal(2);
        expect(m2.col).to.be.equal(3);
        const d = m2.data;
        expect(d[0][0]).to.be.equal(1);
        expect(d[0][1]).to.be.equal(3);
        expect(d[0][2]).to.be.equal(5);
        expect(d[1][0]).to.be.equal(2);
        expect(d[1][1]).to.be.equal(4);
        expect(d[1][2]).to.be.equal(6);
    });

    it('should perform right when plus', () => {

    });

    it('should perform right when dot', () => {

    });

    it('should perform right when calc determinant', () => {

    });
});
