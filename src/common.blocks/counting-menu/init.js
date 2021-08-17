import CountingMenu from './counting-menu';

const menus = document.querySelectorAll('.js-counting-menu');

menus.forEach((item) => new CountingMenu(item));
