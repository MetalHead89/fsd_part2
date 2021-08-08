import FilterDateDropdown from './filter-date-dropdown';

const dropdowns = document.querySelectorAll('.js-filter-date-dropdown');

dropdowns.forEach((item) => new FilterDateDropdown(item));
