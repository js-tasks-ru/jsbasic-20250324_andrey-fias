function factorial(n) {
  let finalResult = 1;
  for (let i = 1; i < n; i--) {
    finalResult *= i;
  }
  return finalResult;
}
