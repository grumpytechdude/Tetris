const tetris = document.getElementById("tetris");

async function run(board, config) {
  let start = config.start;

  document.addEventListener("keyup", function(event) {
    var charCode = event.key || event.keyCode;
    if ("ArrowRight" === charCode) {
      deselectShapeOnCurrentRow();
      start++;
      selectShape();
    }
    if ("ArrowLeft" === charCode) {
      deselectShapeOnCurrentRow();
      start--;
      selectShape();
    }
  });

  function getCell(shape, row) {
    return board[shape[0] + row][shape[1] + start];
  }

  let row = 0;
  let shape = shapes.square;

  function deselectShapeOnPreviousRow() {
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row - 1);
      cell.deselect();
    }
  }

  function deselectShapeOnCurrentRow() {
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      cell.deselect();
    }
  }

  function selectShape() {
    let stopped = false;
    let cells = [];
    for (let shapePart of shape) {
      let cell = getCell(shapePart, row);
      if (!cell.isSelected()) cells.push(cell);
    }
    if (cells.length === shape.length) {
      cells.forEach(cell => cell.select());
    } else {
      for (let shapePart of shape) {
        let cell = getCell(shapePart, row - 1);
        cell.select();
      }
      stopped = true;
    }
    return stopped;
  }

  while (true) {
    let stopped = selectShape();

    await sleep(config.speed);
    row++;
    if (row === config.rows - shape.height + 1 || stopped) {
      row = 0;
      start = config.start;
      shape = shapes.next()
    } else {
      deselectShapeOnPreviousRow();
    }

    console.log("tick");
  }
}

const board = createBoard(config, tetris);
run(board, config).catch(error => {
  const gameOver = document.getElementById("game-over");
  gameOver.setAttribute("visible", "true");
  console.log(error)
});
