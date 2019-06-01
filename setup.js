let training_data = [
    {
        inputs: [0,0],
        targets: [0]
    },
    {
        inputs: [0,1],
        targets: [1]
    },
    {
        inputs: [1,0],
        targets: [1]
    },
    {
        inputs: [1,1],
        targets: [0]
    }
]


function setup(){
    createCanvas(400, 400);

    let nn = new NeuralNetwork(2,2,1);

    for(let i = 0; i < 100000; i++){
        let data = training_data[Math.floor(Math.random() * 4)]
        nn.train(data.inputs, data.targets);
    }

    console.log(nn.feedForward([0,0]));
    console.log(nn.feedForward([0,1]));
    console.log(nn.feedForward([1,0]));
    console.log(nn.feedForward([1,1]));


    
}
