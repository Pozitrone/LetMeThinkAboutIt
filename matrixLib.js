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

    log() {
        console.table(this.matrix);
    }
}

