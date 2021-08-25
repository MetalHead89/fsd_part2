class DropdownHeader {
  constructor(header) {
    this._header = header;
    this._clickToHeaderListeners = [];

    this._init();
    this._addEventListeners();
  }

  getHeader() {
    return this._header;
  }

  addClickToHeaderListener(callback) {
    this._clickToHeaderListeners.push(callback);
  }

  _init() {
    this._handleDropdownHeaderClick = this._handleDropdownHeaderClick.bind(
      this
    );
  }

  _addEventListeners() {
    this._header.addEventListener('click', this._handleDropdownHeaderClick);
  }

  _handleDropdownHeaderClick() {
    this._clickToHeaderListeners.forEach((listener) => listener());
  }
}

export default DropdownHeader;
