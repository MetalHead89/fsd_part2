import CountingMenu from './counting-menu';
import CountingMenuApi from './counting-menu-api';

const menus = document.querySelectorAll('.js-counting-menu');

menus.forEach((item) => CountingMenuApi.addMenu(new CountingMenu(item)));
