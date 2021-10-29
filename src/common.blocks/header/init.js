import Header from './Header';

const headers = document.querySelectorAll('.js-header');
headers.forEach((item) => new Header(item));
