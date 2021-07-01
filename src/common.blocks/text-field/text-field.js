class TextField {
  constructor(field) {
    this._field = field;

    this._handleFieldInput = this._handleFieldInput.bind(this);
    this._handleFieldPaste = TextField.handleFieldPaste.bind(this);
    this._handleFieldKeydown = this._handleFieldKeydown.bind(this);

    this._addEventListeners();
  }

  _addEventListeners() {
    this._field.addEventListener('input', this._handleFieldInput);
    this._field.addEventListener('paste', this._handleFieldPaste);
    this._field.addEventListener('keydown', this._handleFieldKeydown);
  }

  static getTextWithoutDots(text) {
    /**
     * Удаляет точки из полученной строки
     * @param {string} text - строка с точками
     * @returns {string} Строка без точек
     */

    return text.split('.').join('');
  }

  static handleFieldPaste(event) {
    /**
     * Проверяет, что вставляемый текст содержит в себе только цифры и точки.
     * В случае неудачной проверки отменяет вставку
     */

    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');

    if (Number.isNaN(Number(TextField.getTextWithoutDots(pastedData)))) {
      event.preventDefault();
    }
  }

  _isBackspaceAndCaretBeforeDot(key) {
    return (
      key === 'Backspace' &&
      this._field.selectionStart === this._field.selectionEnd &&
      this._field.value.substr(this._field.selectionStart - 1, 1) === '.'
    );
  }

  _isDeleteAndCaretAfterDot(key) {
    return (
      key === 'Delete' &&
      this._field.selectionStart === this._field.selectionEnd &&
      this._field.value.substr(this._field.selectionStart, 1) === '.'
    );
  }

  _handleFieldKeydown(event) {
    /**
     * Сдвигает каретку во время удаления, если она стоит до или перед точкой
     */
    if (this._isBackspaceAndCaretBeforeDot.call(this, event.key)) {
      this._field.selectionStart -= 1;
      this._field.selectionEnd -= 1;
    }

    if (this._isDeleteAndCaretAfterDot.call(this, event.key)) {
      this._field.selectionStart += 1;
      this._field.selectionEnd += 1;
    }
  }

  static deleteContentAndLengthMoreThanTwo(inputType, textLength) {
    return (
      (inputType === 'deleteContentBackward' ||
        inputType === 'deleteContentForward') &&
      textLength > 2
    );
  }

  _handleFieldInput(event) {
    /**
     * Ограничивает ввод символов, не являющихся буквами
     * Расставляет разделители.
     */
    let caretPosition = this._field.selectionStart;
    let text = this._field.value;

    if (Number.isNaN(Number(TextField.getTextWithoutDots(text)))) {
      const startCaretPosition = caretPosition - event.data.length;
      text = `${text.slice(0, startCaretPosition)}${text.slice(caretPosition)}`;
      if (text.length > 1) {
        caretPosition -= 2;
      } else {
        caretPosition += 1;
      }
    }

    if (
      TextField.deleteContentAndLengthMoreThanTwo(event.inputType, text.length)
    ) {
      caretPosition -= 1;
    }

    text = TextField.getTextWithoutDots(text);

    if (text.length >= 2 && text.length < 4) {
      text = `${text.slice(0, 2)}.${text.slice(2)}`;
      caretPosition += 1;
    } else if (text.length >= 4) {
      text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`;
      caretPosition += 1;
    }

    this._field.value = text;
    this._field.selectionStart = caretPosition;
    this._field.selectionEnd = caretPosition;
  }
}

export default TextField;
