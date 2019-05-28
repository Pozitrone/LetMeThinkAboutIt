class Matrix {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = Array();

        for (let i = 0; i < this.rows; i++){
            this.matrix[i] = Array();
            for (let j = 0; j < this.columns; j++){
                this.matrix[i][j] = 0;
            }
        }
    }

    add(n) {
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.matrix[i][j] *= n.matrix[i][j];
                }
            }
        }
        else{
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.matrix[i][j] *= n;
                }
            }
        }  
    }

    multiply(n) {
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        }
        else{
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.matrix[i][j] += n;
                }
            }
        }  
    }

    randomize() {
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }

    mult(mx) {
        let n = this.rows;
        let m = this.columns;
        let p = mx.columns;

        var C = new Matrix(n,p);
        for (let i = 0; i < n; i++){
            for (let j = 0; j < p; j++){
                let sum = 0;
                for (let k = 0; k<m; k++){
                    sum += this.matrix[i][k] * mx.matrix[k][j];
                }
                C.matrix[i][j] = sum;
            }
        }
        return C;
    }

    log() {
        console.table(this.matrix);
    }
}

