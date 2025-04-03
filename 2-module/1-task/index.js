function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    let value = salaries[key];
    if (typeof value === 'number' && isFinite(value)) {
      sum += value;
    }
  }

  return sum;
}
