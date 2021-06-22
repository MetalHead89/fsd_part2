import Dropdown from './dropdown';

const dropdowns = document.querySelectorAll('.js-dropdown');
dropdowns.forEach((item) => new Dropdown(item));

function closeAllDropdowns() {
  dropdowns.forEach((item) => {
    const dropdown = item;
    dropdown.querySelector('.js-dropdown__check').checked = false;
  });
}

function clickIsOutsideDropdown(evt) {
  return (
    (!evt.target.classList.contains('dropdown__header') &&
      !evt.target.classList.contains('dropdown__drop-menu') &&
      !evt.target.classList.contains('text-field__field') &&
      evt.target.offsetParent &&
      !evt.target.offsetParent.classList.contains('dropdown__drop-menu')) ||
    !evt.target.offsetParent
  );
}

function handleBodyClick(evt) {
  if (clickIsOutsideDropdown(evt)) {
    closeAllDropdowns();
  }
}

document.body.addEventListener('mouseup', handleBodyClick);
