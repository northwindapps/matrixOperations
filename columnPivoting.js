window.onload = function () {
    let testArray = new Matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // testArray.preperation();
    // console.log("data", testArray.data);
    // testArray.transpose();
    // console.log("transposed", testArray.transposed);
    // testArray.multipliedByItsTransposed();
    // testArray.backSubstitution();
    testArray.rowReduction();
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

    rowReduction(){
        var n = 3;
        var m = 3;
        let array2D = [[]];
        let output2D = [[]];
        let dataSource = [0,2,3,1,1,1,4,8,-3];//[1,2,-4,2,5,-9,3,-2,3];
        var data_i = 0;
        var rowPivot = 0;
        var columnPivot = 0;
        let pivot = [];
        var maximumPivotValue = 0;
        var constantVector = [3,4,35];//[-4,-10,11];
        var sortSwaped = [];
        //set up a matrix
        for (let i = 0; i < n; i++) {
            array2D[i] = [];
            output2D[i] = [];
            for (let j = 0; j < m; j++) {
                output2D[i][j] = array2D[i][j] = dataSource[data_i++];
                console.log(i,j,array2D[i][j]);
            }
        }
        // console.log("matrix",array2D);
        // output2D = array2D.map((x) => x); not work

        for (let i = 0; i < n; i++) {
            pivot[i] = i;
        }

        //row k
        for (let k = 0; k < m; k++) {
            rowPivot = k;//0 , 1, 2, 3 or Matrix[0][0],Matrix[1][1],Matrix[2][2],
            columnPivot = k;
            maximumPivotValue = output2D[k][k];

            for (let r = k; r < m; r++) {
                for (let c = k; c < n; c++) {
                    //this time we only use row pivoting
                    // if (c == k) {
                        // console.log(r,c, array2D[r][c]); 
                        if (maximumPivotValue < output2D[r][c]) {
                            maximumPivotValue = output2D[r][c];
                            rowPivot = r;
                            columnPivot = c;
                        }  
                    // }
                }
            }
        
            if (rowPivot !== k) {
                var  c = constantVector[k];
                constantVector[k] = constantVector[rowPivot];
                constantVector[rowPivot] = c;
                for (let c = k; c < n; c++) {
                
                    let a = output2D[k][c];
                    // let a = Object.assign({},output2D[k][c]);
                    let b = output2D[rowPivot][c];
                    output2D[k][c] = b;
                    output2D[rowPivot][c] = a;
                    // if (k == 0) {
                    //     console.log("kc",k,c,output2D[k][c] );  
                    //     console.log("rowPivot c",rowPivot,c, output2D[rowPivot][c]);  
                    //     // console.log("output2D row, c",output2D[rowPivot][c]);  
                    //     console.log("original",array2D);   
                    // }           
                }
            }

            if (columnPivot !== k) {
                var  p = pivot[columnPivot];
                pivot[columnPivot] = pivot[k];
                pivot[k] = p;
                for (let r = 0; r < n; r++) {                
                    let a = output2D[r][k];
                    output2D[r][k] = output2D[r][columnPivot];
                    output2D[r][columnPivot]= a;
                }
            }

            
            //start row-reduction
            for (let i = k + 1; i < n; i++)
            {
                let a = output2D[i][k]/output2D[k][k];
                constantVector[i] -= a * constantVector[k];
                for (let c = k; c < n; c++) {
                    output2D[i][c] -= a * output2D[k][c];
                }
            }
        }
        console.log("output2D_r",output2D);
        console.log("constantVector_r",constantVector);

        //backSubstitution
        //see how it goes
        //asuming we have a echelon matrix
        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                if (i == j) {
                    if(i == n - 1){
                        constantVector[i] /= output2D[i][j];
                    }else{
                        for (let k = n - 1; k > j; k--) {
                            constantVector[i] -= (output2D[i][k]*constantVector[k]);
                        }  
                        constantVector[i] /= output2D[i][j];
                    }
                }
                output2D[i][j];
            }
        }

        for (let r = 0; r < n; r++) {  
            sortSwaped[r] = constantVector[r];
        }
        for (let r = 0; r < n; r++) {  
            constantVector[pivot[r]] = sortSwaped[r];
        }

        console.log("constantVector",constantVector);
        console.log("fixed constantVector[0]",constantVector[0].toFixed(8));
        console.log("fixed constantVector[1]",constantVector[1].toFixed(8));
        console.log("fixed constantVector[2]",constantVector[2].toFixed(8));

    }

    backSubstitution(){
        var n = 3;
        var m = 3;
        var array2D = [[]];
        var dataSource = [1,2,-4,0,1,-1,0,0,7];
        var data_i = dataSource.length-1;
        var constantVector = [-12,-3,21];
        var answer = [];
        //set up a matrix
        for (let i = n - 1; i >= 0; i--) {
            array2D[i] = [];
            for (let j = m - 1; j >= 0; j--) {
                array2D[i][j] = dataSource[data_i--];
            }
        }
        console.log("backsubstitution",array2D);

        //asuming we have a echelon matrix
        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                if (i == j) {
                    if(i == n - 1){
                        constantVector[i] /= array2D[i][j];
                    }else{
                        for (let k = n - 1; k > j; k--) {
                            constantVector[i] -= (array2D[i][k]*constantVector[k]);
                        }  
                        constantVector[i] /= array2D[i][j];
                    }
                }
                array2D[i][j];
            }
        }
        console.log(constantVector);

    }
}