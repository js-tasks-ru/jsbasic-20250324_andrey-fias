function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  button.addEventListener('click', () => {
    text.hidden = !text.hidden;
  });
}
