const tetris = document.getElementById("tetris");

async function run(board, config) {
  let start = config.start;

  function getCell(shape, row) {
    return board[shape[0] + row][shape[1] + start];
  }

  let row = 0;
  let shape = shapes.square;

  function deselectShape() {
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row - 1);
      cell.deselect();
    }
  }

  while (true) {

    let cells = [];
    let stopped = false;
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      if (!cell.isSelected())
        cells.push(cell);
    }
    if (cells.length === shape.length) {
      cells.forEach(cell => cell.select())
    } else {
      for (let shapePart of shape) {
        let cell = getCell(shapePart, row - 1);
        cell.select();
      }
      stopped = true;
    }

    await sleep(config.speed);
    row++;
    if (row === config.rows - 1 || stopped) {
      row = 0;
      shape = shape === shapes.square ? shapes.l : shapes.square;
    } else {
      deselectShape();
    }

    console.log("tick");
  }
}

const board = createBoard(config, tetris);
run(board, config);
