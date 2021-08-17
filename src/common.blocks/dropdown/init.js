import Dropdown from './dropdown';

const dropdowns = document.querySelectorAll('.js-dropdown');

dropdowns.forEach((item) => new Dropdown(item));
