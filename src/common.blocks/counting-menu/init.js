import CountingMenu from './CountingMenu';
import CountingMenuStore from './CountingMenuStore';

const menus = document.querySelectorAll('.js-counting-menu');

menus.forEach((item) => CountingMenuStore.addMenu(new CountingMenu(item)));
