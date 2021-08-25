const DropdownHeaderStore = {
  _headers: [],

  addHeader(header) {
    this._headers.push(header);
  },

  getHeaderByElement(element) {
    return this._headers.find((header) => header.getHeader() === element);
  },
};

export default DropdownHeaderStore;
