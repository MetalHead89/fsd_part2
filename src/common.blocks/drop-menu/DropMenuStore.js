const DropMenuStore = {
  _dropMenus: [],

  addDropMenu(menu) {
    this._dropMenus.push(menu);
  },

  getDropMenuByElement(element) {
    return this._dropMenus.find((menu) => menu.getDropMenu() === element);
  },
};

export default DropMenuStore;
