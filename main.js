window.onload = function () {
    let testArray = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    testArray.preperation();
    console.log("data", testArray.data);
    testArray.transpose();
    console.log("transposed", testArray.transposed);
    testArray.multipliedByItsTransposed();
}



class Matrix {
    constructor(rowInt, colInt, sourceAry) {
        this.rowInt = rowInt;
        this.colInt = colInt;
        this.sourceAry = sourceAry;
        this.data = [[]];
        this.transposed = [[]]
    }

    preperation() {
        var row = this.rowInt;
        var col = this.colInt;
        var i = 0;
        var array2D = [[]];
        for (var r = 0; r < row; ++r) {
            array2D[r] = [];
            for (var c = 0; c < col; ++c) {
                array2D[r][c] = this.sourceAry[i++];
            }
        }
        this.data = array2D;
    }
    //転置行列生成
    transpose() {
        var row = this.colInt;
        var col = this.rowInt;
        var array2D = [[]];
        for (var r = 0; r < row; ++r) {
            array2D[r] = [];
            for (var c = 0; c < col; ++c) {
                array2D[r][c] = this.data[c][r];
            }
        }
        this.transposed = array2D;
    }
    //行列と転置行列の積の成果物
    multipliedByItsTransposed() {
        var row = this.colInt;
        var col = this.rowInt;
        var array2D = [[]];
        var sum = 0;

        for (var r = 0; r < row; ++r) {
            array2D[r] = [];
            for (var j = 0; j < col; j++) {
                sum = 0;
                for (var c = 0; c < col; ++c) {
                    var a = this.data[r][c];
                    var b = this.transposed[c][j];
                    sum += a * b;
                }
                array2D[r][j] = sum;
            }
        }
        console.log("MBIT", array2D)
    }
    //逆行列生成
    inverse() {
        // todo A^-1
    }
}