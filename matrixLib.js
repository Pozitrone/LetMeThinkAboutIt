function Matrix(rows, columns){
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

Matrix.prototype.multiply = function(n) {
    for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.columns; j++){
            this.matrix[i][j] *= n;
        }
    }
    
}

Matrix.prototype.add = function(n) {
    for (let i = 0; i < this.rows; i++){
        for (let j = 0; j < this.columns; j++){
            this.matrix[i][j] += n;
        }
    }
}