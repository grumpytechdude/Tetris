const square = [[0, 0], [0, 1], [1, 0], [1, 1]];
const l = [[0, 0], [0, 1], [0, 2], [0, 3]];
square.height = 2;
l.height = 1;
square.name = "square";
l.name = "l";

const allShapes = [square, l];

const shapes = {
  square: square,
  l: l,
  generator: generatorFunction(),
  next: function() {
    return this.generator.next().value;
  }

};

function* generatorFunction() {
  while (true) {
    yield allShapes[Math.floor(Math.random()*allShapes.length)]
  }
}