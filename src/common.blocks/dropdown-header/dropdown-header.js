class DropdownHeader {
  constructor(header) {
    this._header = header;
    this._clickToHeaderListeners = [];
  }

  getHeader() {
    return this._header;
  }

  addClickToHeaderListener(callback) {
    this._clickToHeaderListeners.push(callback);
  }
}

export default DropdownHeader;
