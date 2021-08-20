const CountingMenuApi = {
  _countingMenus: [],

  addMenu(menu) {
    this._countingMenus.push(menu);
  },

  getMenuByElement(element) {
    return this._countingMenus.find((menu) => menu.getMenu === element);
  },
};

export default CountingMenuApi;
