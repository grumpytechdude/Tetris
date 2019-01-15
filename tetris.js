const tetris = document.getElementById("tetris");

async function run(board, config) {
  let start = config.start;

  function getCell(shape, row) {
    return board[shape[0] + row][shape[1] + start];
  }

  let row = 0;
  let shape = shapes.square;
  while (true) {

    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      cell.select();
    }

    await sleep(config.speed);
    row++;
    if (row === config.rows - 1) {
      row = 0;
      shape = shape === shapes.square ? shapes.l : shapes.square;
    } else {
      for (let shapePart of shape) {
        let cell = getCell(shapePart, row-1);
        cell.deselect();
      }
    }

    console.log("tick");
  }
}

const board = createBoard(config, tetris);
run(board, config);
