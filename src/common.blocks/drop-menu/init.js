import DropMenu from './DropMenu';
import DropMenuStore from './DropMenuStore';

const dropMenus = document.querySelectorAll('.js-drop-menu');

dropMenus.forEach((menu) => DropMenuStore.addDropMenu(new DropMenu(menu)));
