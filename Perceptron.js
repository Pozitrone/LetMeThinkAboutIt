var width = 800;
var height = 800;

function f(x){
    //-------------------------------------
    let y = x * 2 + .35;
    //-------------------------------------
    return y;
}
function pX(x){
    return map(x,-1,1,0,width);
}

function pY(y){
    return map(y,-1,1,height,0); 
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sign(num){
    return num > 0 ? 1 : -1;
}

function map(value, minA, maxA, minB, maxB) {
    return (1 - ((value - minA) / (maxA - minA))) * minB + ((value - minA) / (maxA - minA)) * maxB;
}


class Perceptron{
    errorSum = 0;
    constructor (n) {
        this.weights = new Array(n+1);
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

    train(inputs, answer, learningRate = 0.001){
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");
        let guess = this.guess(inputs);
        let error = answer - guess;

        this.errorSum += Math.abs(error);

        for(let i = 0, j = this.weights.length; i < j; i++){
            this.weights[i] += error * inputs[i] * learningRate;
        }

        if(guess > 0){
            context.fillStyle = "#aaa";
        }
        else{
            context.fillStyle = "#eee";
        }
        context.fillRect(pX(inputs[0]),pY(inputs[1]),8,8);
    }

    guessY(x){
        return ((- this.weights[2]- this.weights[0] * x ) / this.weights[1]);
    }



}

class Point {
    inputs;
    answer = 0;

    constructor (n) {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        this.inputs = new Array(n+1);

        this.inputs[0] = getRandom(-1,1);
        this.inputs[1] = getRandom(-1,1);
        this.inputs[2] = 1; //bias
        this.answer = this.solution(this.inputs);

        let x = this.inputs[0];
        let y = this.inputs[1];

        context.fillStyle = "#0000ff";
        context.fillRect(pX(x)-1,pY(y)-1,10,10);
        context.fillStyle = "#ffffff";
        context.fillRect(pX(x),pY(y),8,8);
    }

    solution(inputs){
        let x = inputs[0];
        let y = inputs[1];
        let lineY = f(x);

        return y > lineY ? 1 : -1;
    }
}