var width = 800;
var height = 800;

function pX(x){
    return x + width/2;
}

function pY(y){
    return height/2 - y; 
}

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
    bias = 1;
    biasWeight = 0;
    

    constructor () {
        for (let i = 0, j = this.weights.length; i < j; i++){
            this.weights[i] = getRandom(-1,1);
        }
        this.biasWeight = getRandom(-1,1);
    }

    guess(inputs){
        let sum = 0;
        for (let i = 0, j = this.weights.length; i < j; i++){
            sum += this.weights[i] * inputs[i];
        }
        sum += this.bias * this.biasWeight;
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

        this.biasWeight += error * this.bias * learningRate;

        if(guess == answer){
            context.fillStyle = "#00ff00";
        }
        else{
            context.fillStyle = "#ff0000";
        }
        context.fillRect(pX(inputs[0]),pY(inputs[1]),8,8);
    }

}

class Point {
    inputs = new Array(2);
    answer = 0;

    constructor () {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        this.inputs[0] = randInt(width)-~~(width/2);
        this.inputs[1] = randInt(height)-~~(height/2);
        this.answer = this.solution(this.inputs);

        let x = this.inputs[0];
        let y = this.inputs[1];
        context.fillStyle = "#0000ff";
        context.fillRect(pX(x-1),pY(y+1),10,10);

        context.fillStyle = this.answer == 1 ? "#aaa" : "#eee";
        context.fillRect(pX(x),pY(y),8,8);
    }

    solution(inputs){
        let x = inputs[0];
        let y = inputs[1];
        return x >= y ? 1 : -1;
    }
}