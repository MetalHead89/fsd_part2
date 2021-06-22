import Header from './header';

const headers = document.querySelectorAll('.js-header');
headers.forEach((item) => new Header(item));
