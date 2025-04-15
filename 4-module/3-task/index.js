function highlight(table) {
  Array.from(table.tBodies[0].rows).forEach(row => {
    const [nameCell, ageCell, genderCell, statusCell] = row.cells;
    row.classList.add(genderCell.textContent === 'm' ? 'male' : 'female');
    if (+ageCell.textContent < 18) {
      row.style.textDecoration = 'line-through';
    }
    const available = statusCell.dataset.available;
    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }
  });
}
