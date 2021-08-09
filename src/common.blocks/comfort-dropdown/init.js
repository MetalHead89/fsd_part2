import ComfortDropdown from './comfort-dropdown';

const dropdowns = document.querySelectorAll('.js-comfort-dropdown');

dropdowns.forEach((item) => new ComfortDropdown(item));
