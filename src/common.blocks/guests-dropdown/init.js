import GuestsDropdown from './guests-dropdown';

const dropdowns = document.querySelectorAll('.js-guests-dropdown');

dropdowns.forEach((item) => new GuestsDropdown(item));
