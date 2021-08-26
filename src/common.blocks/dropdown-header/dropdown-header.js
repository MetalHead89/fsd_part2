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

  setText(text) {
    this._headerText.innerText = text || this._placeholder;
  }

  activate() {
    this._header.classList.add('dropdown-header_active');
  }

  disactivate() {
    this._header.classList.remove('dropdown-header_active');
  }

  _init() {
    this._headerText = this._header.querySelector('.js-dropdown-header__text');
    this._placeholder = this._headerText.innerText;

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
