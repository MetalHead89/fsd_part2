import Pagination from './pagination';

const paginations = document.querySelectorAll('.js-pagination');

paginations.forEach((item) => new Pagination(item));
