var width = 800;
var height = 800;

function f(x){
    //y = ax+b
    return 4 * x + 100;
}
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
    return num > 0 ? 1 : -1;
}


class Perceptron{
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
        context.fillRect(pX(inputs[0]),pY(inputs[1]),8,8);
    }

    guessY(x){
        return (- this.weights[2]*800 - this.weights[0] * x ) / this.weights[1];
    }

}

class Point {
    inputs;
    answer = 0;

    constructor (n) {
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext("2d");

        this.inputs = new Array(n+1);

        this.inputs[0] = randInt(width)-Math.floor(width/2);
        this.inputs[1] = randInt(height)-Math.floor(height/2);
        this.inputs[2] = 1; //bias
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
        let lineY = f(x);

        return y > lineY ? 1 : -1;
    }
}