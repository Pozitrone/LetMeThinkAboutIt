class Matrix {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.data = Array();

        for (let i = 0; i < this.rows; i++){
            this.data[i] = Array();
            for (let j = 0; j < this.columns; j++){
                this.data[i][j] = 0;
            }
        }
    }

    add(n){
        if(n instanceof Matrix){
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.data[i][j] *= n.data[i][j];
                }
            }
        }
        else{
            for (let i = 0; i < this.rows; i++){
                for (let j = 0; j < this.columns; j++){
                    this.data[i][j] *= n;
                }
            }
        }  
    }

    static multiply(m ,n){
        if(m.columns !== n.rows){
            throw ("Columns of A != Rows of B");
        }
        else{
            let a = m.rows;
            let b = m.columns;
            let c = n.columns;

            var C = new Matrix(a,c);
            for (let i = 0; i < a; i++){
                for (let j = 0; j < c; j++){
                    let sum = 0;
                    for (let k = 0; k<b; k++){
                        sum += m.data[i][k] * n.data[k][j];
                    }
                    C.data[i][j] = sum;
                }
            }
            return C;
        }
    }

    multiply(n){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                this.data[i][j] *= n;
            }
        }
         
    }

    transpose(){
        let m = new Matrix(this.columns,this.rows);

        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                m.data[j][i] = this.data[i][j];
            }
        }
        this.data = m.data;
        this.columns = m.columns;
        this.rows = m.rows;
    }

    static transpose(){
        let m = new Matrix(this.columns,this.rows);

        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                m.data[j][i] = this.data[i][j];
            }
        }
        return m;
    }

    map(fn){
        // Apply function to every element
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        }
    }

    localEdit(fn, i, j){
        if(i >= 0 && j >= 0){
            let val = this.data[i][j];   
            this.data[i][j] = fn(val);
        }
        else{
            throw("Incorrect index.");
        }
    }



    randomize(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.columns; j++){
                this.data[i][j] = Math.floor(Math.random() * 10);
            }
        } 
    }

    log(){
        console.table(this.data);
    }
}

function setup(){
    let m = new Matrix(2,3);
    let n = new Matrix(3,2);
    m.randomize();
    n.randomize();
    m.log();
    n.log();


    var c = m.multiply(n);
    c.log();
}

