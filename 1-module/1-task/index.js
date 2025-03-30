function factorial(n) {
  if (n === 0) return 1;
  let finalResult = 1;
  for (let i = 1; i <= n; i++) {
    finalResult *= i;
  }
  return finalResult;
}
