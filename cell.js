const createCell = function(row, column) {
  const cellDiv = document.createElement("div");
  cellDiv.setAttribute("id", `cell-${row}-${column}`);
  cellDiv.setAttribute("class", `cell`);

  const cell = {
    element: cellDiv,
    select: function() {
      cellDiv.setAttribute("selected", `true`);
    },
    deselect: function() {
      cellDiv.setAttribute("selected", `false`);
    }
  };

  return cell;
};
