import DropMenu from './drop-menu';
import DropMenuStore from './drop-menu-store';

const dropMenus = document.querySelectorAll('.js-drop-menu');

dropMenus.forEach((menu) => DropMenuStore.addDropMenu(new DropMenu(menu)));