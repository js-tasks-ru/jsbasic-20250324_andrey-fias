function camelize(str) {
  let parts = str.split('-');
  for (let i = 1; i < parts.length; i++) {
    parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  return parts.join('');
}
