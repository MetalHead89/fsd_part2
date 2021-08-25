class DropMenu {
  constructor(dropMenu) {
    this._dropMenu = dropMenu;
  }

  getDropMenu() {
    return this._dropMenu;
  }

  openDropMenu() {
    this._dropMenu.classList.add('drop-menu_opened');
  }

  closeDropMenu() {
    this._dropMenu.classList.remove('drop-menu_opened');
  }

  toggleDropMenuState() {
    this._dropMenu.classList.toggle('drop-menu_opened');
  }
}

export default DropMenu;
