function ucFirst(str) {
  if (str === '') {
    return '';
  } else {
    let upperCaseFirstLetter = str[0].toUpperCase() + str.slice(1);
    return upperCaseFirstLetter;
  }
}
