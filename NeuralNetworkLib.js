class NeuralNetwork {
    constructor (InputAmount, HiddenAmount, OutputAmount) {
        this.input_nodes = InputAmount;
        this.hidden_nodes = HiddenAmount;
        this.output_nodes = OutputAmount;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_ho.randomize();
        this.weights_ih.randomize();
    
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    feedForward(input){
        let inputs = Matrix.fromArray(input);

        console.log(inputs);
        // Generating hidden outputs
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        // Generating the output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        //activation function
        return output.toArray();
    }

    train(input, answer){
        // ...
    }
}

function sigmoid(x){
    return 1 / (1+Math.exp(-x));
}


