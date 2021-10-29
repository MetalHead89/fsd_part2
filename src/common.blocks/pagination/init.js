import Pagination from './Pagination';

const paginations = document.querySelectorAll('.js-pagination');

paginations.forEach((item) => new Pagination(item));
