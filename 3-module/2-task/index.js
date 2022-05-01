function filterRange(arr, a, b) {
  return arr.filter((arrItem) => {
    return arrItem >= a && arrItem <= b;
  })
}
