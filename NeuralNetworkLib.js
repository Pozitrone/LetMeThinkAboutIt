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

        this.learningRate = .1;
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

    train(input_array, target_array){
        if(this.input_nodes != input_array.length){
            throw "Input nodes don't match amount of inputs.";
        }
        if(this.output_nodes != target_array.length){
            throw "Output nodes don't match amount of targets.";
        }

        let inputs = Matrix.fromArray(input_array);

        // Generating hidden outputs
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);

        // Generating the output
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);


        let targets = Matrix.fromArray(target_array);

        //calculate the error
        // Error = targets - outputs

        let output_errors = Matrix.subtract(targets,outputs);

        //calculate gradient
        let gradients = Matrix.map(outputs,dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learningRate);

        //calculate output deltas
        let hidden_T = Matrix.transpose(hidden);
        let weigths_ho_deltas = Matrix.multiply(gradients, hidden_T);

        // Adjust weights by deltas
        this.weights_ho.add(weigths_ho_deltas);
        // Adjus bias weights
        this.bias_o.add(gradients);

        //-------

        //calculate hidden layers errors
        let weights_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);

        // calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden,dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learningRate);

        // calculate hidden deltas
        let inputs_T = Matrix.transpose(inputs);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

        // Adjust ih weights
        this.weights_ih.add(weights_ih_deltas);

        //Adjust bias weight
        this.bias_h.add(hidden_gradient);
    }
}

function sigmoid(x){
    return 1 / (1+Math.exp(-x));
}

function dsigmoid(y){
    //return (sigmoid(x) * (1 - sigmoid(x)));
    return (y * (1 - y));
}


