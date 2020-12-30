const maskedTextField = document.querySelector('.text-field__field-masked');

function getTextWithoutDots(text) {
  /**
   * Удаляет точки из полученной строки
   * @param {string} text - строка с точками
   * @returns {string} Строка без точек
   */

  return text.split('.').join('');
}

function onPasteMaskedTextField(event) {
  /**
   * Проверяет, что вставляемый текст содержит в себе только цифры и точки.
   * В случае неудачной проверки отменяет вставку
   */

  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData('Text');

  if (Number.isNaN(Number(getTextWithoutDots(pastedData)))) {
    event.preventDefault();
  }
}

function isBackspaceAndCaretBeforeDot(key) {
  return key === 'Backspace' && this.selectionStart === this.selectionEnd
    && this.value.substr(this.selectionStart - 1, 1) === '.';
}

function isDeleteAndCaretAfterDot(key) {
  return key === 'Delete' && this.selectionStart === this.selectionEnd
    && this.value.substr(this.selectionStart, 1) === '.';
}

function onKeydowMaskedTextField(event) {
  /**
   * Сдвигает каретку во время удаления, если она стоит до или перед точкой
   */
  if (isBackspaceAndCaretBeforeDot.call(this, event.key)) {
    this.selectionStart -= 1;
    this.selectionEnd -= 1;
  }

  if (isDeleteAndCaretAfterDot.call(this, event.key)) {
    this.selectionStart += 1;
    this.selectionEnd += 1;
  }
}

function deleteContentAndLengthMoreThanTwo(inputType, textLength) {
  return (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') && textLength > 2;
}

function onInputMaskedTextField(event) {
  /**
   * Ограничивает ввод символов, не являющихся буквами
   * Расставляет разделители.
   */
  let caretPosition = this.selectionStart;
  let text = this.value;

  if (Number.isNaN(Number(getTextWithoutDots(text)))) {
    const startCaretPosition = caretPosition - event.data.length;
    text = `${text.slice(0, startCaretPosition)}${text.slice(caretPosition)}`;
    if (text.length > 1) {
      caretPosition -= 2;
    } else {
      caretPosition += 1;
    }
  }

  if (deleteContentAndLengthMoreThanTwo(event.inputType, text.length)) {
    caretPosition -= 1;
  }

  text = getTextWithoutDots(text);

  if (text.length >= 2 && text.length < 4) {
    text = `${text.slice(0, 2)}.${text.slice(2)}`;
    caretPosition += 1;
  } else if (text.length >= 4) {
    text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`;
    caretPosition += 1;
  }

  this.value = text;
  this.selectionStart = caretPosition;
  this.selectionEnd = caretPosition;
}

if (maskedTextField) {
  maskedTextField.oninput = onInputMaskedTextField;
  maskedTextField.onpaste = onPasteMaskedTextField;
  maskedTextField.onkeydown = onKeydowMaskedTextField;
}
