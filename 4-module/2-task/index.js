function makeDiagonalRed(table) {
  for (let index = 0; index < table.rows.length; index++) {
    table.rows[index].cells[index].style.backgroundColor = 'red';
  }
}
