class TextField {
  constructor(field) {
    this.field = field;

    this.addEventListeners();
  }

  addEventListeners() {
    this.field.addEventListener('input', this.handleFieldInput.bind(this));
    this.field.addEventListener('paste', this.handleFieldPaste);
    this.field.addEventListener('keydown', this.handleFieldKeydown.bind(this));
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

  isBackspaceAndCaretBeforeDot(key) {
    return (
      key === 'Backspace' &&
      this.field.selectionStart === this.field.selectionEnd &&
      this.field.value.substr(this.field.selectionStart - 1, 1) === '.'
    );
  }

  isDeleteAndCaretAfterDot(key) {
    return (
      key === 'Delete' &&
      this.field.selectionStart === this.field.selectionEnd &&
      this.field.value.substr(this.field.selectionStart, 1) === '.'
    );
  }

  handleFieldKeydown(event) {
    /**
     * Сдвигает каретку во время удаления, если она стоит до или перед точкой
     */
    if (this.isBackspaceAndCaretBeforeDot.call(this, event.key)) {
      this.field.selectionStart -= 1;
      this.field.selectionEnd -= 1;
    }

    if (this.isDeleteAndCaretAfterDot.call(this, event.key)) {
      this.field.selectionStart += 1;
      this.field.selectionEnd += 1;
    }
  }

  static deleteContentAndLengthMoreThanTwo(inputType, textLength) {
    return (
      (inputType === 'deleteContentBackward' ||
        inputType === 'deleteContentForward') &&
      textLength > 2
    );
  }

  handleFieldInput(event) {
    /**
     * Ограничивает ввод символов, не являющихся буквами
     * Расставляет разделители.
     */
    let caretPosition = this.field.selectionStart;
    let text = this.field.value;

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

    this.field.value = text;
    this.field.selectionStart = caretPosition;
    this.field.selectionEnd = caretPosition;
  }
}

export default TextField;
