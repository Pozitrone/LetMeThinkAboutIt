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

    train(inputs, targets){
        if(this.input_nodes != inputs.length){
            throw "Input nodes don't match amount of inputs.";
        }
        if(this.output_nodes != targets.length){
            throw "Output nodes don't match amount of targets.";
        }
        let outputs = this.feedForward(inputs);

        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);

        //calculate the error
        // Error = targets - outputs

        let output_errors = Matrix.subtract(targets,outputs);
        let weights_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);


        outputs.log();
        targets.log();
        output_errors.log();
    }
}

function sigmoid(x){
    return 1 / (1+Math.exp(-x));
}


