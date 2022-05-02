function camelize(str) {
  let strArr = Object.assign([], str);

  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === '-') {
      strArr.splice(i, 1);
      strArr[i] = strArr[i].toUpperCase();
    }
  }

  return strArr.join('');
}


