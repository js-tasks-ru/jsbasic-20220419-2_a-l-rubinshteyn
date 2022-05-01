function getMinMax(str) {
  let elements = str.split(' ');


  let numberElements = elements
    .filter((item) => !isNaN(item))
    .map((item) => +item)
    .sort((a,b) => a - b);

  return {
    min: numberElements.at(0),
    max: numberElements.at(-1)
  };

}


