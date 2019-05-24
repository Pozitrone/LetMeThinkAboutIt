var width = 800;
var height = 800;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sign(num){
    return num >= 0 ? 1 : -1;
}

class Perceptron{
    weights = new Array(2);
    

    constructor () {
        for (let i = 0, j = this.weights.length; i < j; i++){
            this.weights[i] = getRandom(-1,1);
        }
    }

    guess(inputs){
        let sum = 0;
        for (let i = 0, j = this.weights.length; i < j; i++){
            sum += this.weights[i] * inputs[i];
        }
        return sign(sum);
    }

    train(inputs, answer, learningRate = 0.01){
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let guess = this.guess(inputs);
        let error = answer - guess;

        for(let i = 0, j = this.weights.length; i < j; i++){
            this.weights[i] += error * inputs[i] * learningRate;
        }

        if(guess == answer){
            context.fillStyle = "#00ff00";
        }
        else{
            context.fillStyle = "#ff0000";
        }
        context.fillRect(inputs[0],inputs[1],8,8);
    }

}

class Point {
    inputs = new Array(2);
    answer = 0;

    constructor () {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        this.inputs[0] = randInt(width);
        this.inputs[1] = randInt(height);
        this.answer = this.solution(this.inputs);

        let x = this.inputs[0];
        let y = this.inputs[1];
        context.fillStyle = "#0000ff";
        context.fillRect(x-1,y-1,10,10);

        context.fillStyle = this.answer == 1 ? "#aaa" : "#eee";
        context.fillRect(x,y,8,8);
    }

    solution(inputs){
        let x = inputs[0];
        let y = inputs[1];
        return x >= y ? 1 : -1;
    }
}