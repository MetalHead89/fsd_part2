class DropMenu {
  constructor(dropMenu) {
    this._dropMenu = dropMenu;

    this._init();
    this._addEventListeners();
  }

  addClickToClearButtonListener(listener) {
    this._clickToClearButtonListeners.push(listener);
  }

  addClickToApplyButtonListener(listener) {
    this._clickToApplyButtonListeners.push(listener);
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

  showClearButton() {
    if (this._clearButton) {
      this._clearButton.classList.remove('drop-menu__button-clear_theme_hidden');
    }
  }

  hideClearButton() {
    if (this._clearButton) {
      this._clearButton.classList.add('drop-menu__button-clear_theme_hidden');
    }
  }

  _init() {
    this._clickToClearButtonListeners = [];
    this._clickToApplyButtonListeners = [];
    this._clearButton = this._dropMenu.querySelector(
      '.js-drop-menu__button-clear'
    );
    this._applyButton = this._dropMenu.querySelector(
      '.js-drop-menu__button-apply'
    );

    this._handleButtonClearClick = this._handleButtonClearClick.bind(this);
    this._handleButtonApplyClick = this._handleButtonApplyClick.bind(this);
  }

  _addEventListeners() {
    if (this._clearButton) {
      this._clearButton.addEventListener('click', this._handleButtonClearClick);
    }

    if (this._applyButton) {
      this._applyButton.addEventListener('click', this._handleButtonApplyClick);
    }
  }

  _handleButtonClearClick() {
    this._clickToClearButtonListeners.forEach((listener) => listener());
  }

  _handleButtonApplyClick() {
    this._clickToApplyButtonListeners.forEach((listener) => listener());
  }
}

export default DropMenu;
