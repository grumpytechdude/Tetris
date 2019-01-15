const tetris = document.getElementById("tetris");

async function run(board, config) {
  let start = config.start;

  function getCell(shape, row) {
    let cell = board[shape[0] + row][shape[1] + start];
    return cell;
  }

  let row = 0;
  while (true) {
    let shape = [[0, 0], [0, 1], [1, 0], [1, 1]];

    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      cell.select();
    }

    await sleep(1000);
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      cell.deselect();
    }
    row++;
    console.log("tick");
  }
}

const board = createBoard(config, tetris);
run(board, config);
