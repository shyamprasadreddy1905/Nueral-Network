let model;
let targetLabel = 'C';

function setup() {
  createCanvas(600, 400);
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  };
  model = ml5.neuralNetwork(options);
  background(240);
}

function keyPressed() {
  if (key == 't') {
    console.log('Starting Training!');
    model.normalizeData();
    let options = {
      epochs: 100
    }
    model.train(options, whileTraining, finishedTraining);
  } else {
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log('Finished Training!');
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY
  }

  let target = {
    label: targetLabel
  }

  model.addData(inputs, target);
  
  noFill();
  ellipse(mouseX, mouseY, 24);
  fill(0);
  textAlign(CENTER, CENTER);
  text(targetLabel, mouseX, mouseY);
}
