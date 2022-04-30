function sumSalary(salaries) {

  let summ = 0;

  for (let prop in salaries) {
    if (isFinite(salaries[prop])) {
      summ += +salaries[prop];
    }
  }

  return summ;
}
