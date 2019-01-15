const createBoard = function(config, rootElement) {
  const cells = createCellsArray(config.rows, config.columns);

  for (let rowIndex = 0; rowIndex < cells.length; rowIndex++) {
    let row = cells[rowIndex];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      let cell = createCell(rowIndex, cellIndex);
      row[cellIndex] = cell;
      rootElement.appendChild(cell.element);
    }
  }

  return cells;
};

const createCellsArray = function(rows, columns) {
  const x = new Array(rows);

  for (let i = 0; i < x.length; i++) {
    x[i] = new Array(columns);
  }
  return x;
};
