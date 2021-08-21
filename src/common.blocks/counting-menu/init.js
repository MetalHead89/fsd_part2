import CountingMenu from './counting-menu';
import CountingMenuStore from './counting-menu-store';

const menus = document.querySelectorAll('.js-counting-menu');

menus.forEach((item) => CountingMenuStore.addMenu(new CountingMenu(item)));
