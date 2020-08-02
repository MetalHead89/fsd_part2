let maskedTextField = document.querySelector('.text-field__field-masked');

if (maskedTextField) {
    maskedTextField.oninput = onInputMaskedTextField;
    maskedTextField.onpaste = onPastetMaskedTextField;
    maskedTextField.onkeydown = onKeydowMaskedTextField;
}

function getTextWithoutDots(text) {
    /**
     * Удаляет точки из полученной строки
     * 
     * @param {string} text - строка с точками
     * @returns {string} Строка без точек
     */

    return text.split('.').join('');
}

function onPastetMaskedTextField() {
    /**
     * Проверяет, что вставляемый текст содержит в себе только цифры и точки.
     * В случае неудачной проверки отменяет вставку
     */

    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    if (isNaN(getTextWithoutDots(pastedData)))
        event.preventDefault();
}

function onKeydowMaskedTextField() {
    /**
     * Сдвигает каретку во время удаления, если она стоит до или перед точкой
     */
    
    if (event.key == 'Backspace' && this.selectionStart == this.selectionEnd && 
    this.value.substr(this.selectionStart - 1, 1) == '.') {
        this.selectionStart--;
        this.selectionEnd--;
    }
    if (event.key == 'Delete' && this.selectionStart == this.selectionEnd && 
    this.value.substr(this.selectionStart, 1) == '.') {
        this.selectionStart++;
        this.selectionEnd++;
    }
}

function onInputMaskedTextField() {
    /**
     * Ограничивает ввод символов, не являющихся буквами
     * Расставляет разделители.
     */
    let caretPosition = this.selectionStart;
    let text = this.value;
    
    if (isNaN(getTextWithoutDots(text))) {
        startCaretPosition = caretPosition - event.data.length;
        text = `${text.slice(0, startCaretPosition)}${text.slice(caretPosition)}`;
        if (text.length > 1)
            caretPosition -= 2;
        else
            caretPosition--;
    }

    if ((event.inputType == 'deleteContentBackward' || event.inputType == 'deleteContentForward') && text.length > 2) {
        caretPosition--;
    }

    text = getTextWithoutDots(text);
    
    if (text.length >= 2 && text.length < 4) {
        text = `${text.slice(0, 2)}.${text.slice(2)}`;
        caretPosition ++;
    }
    else if (text.length >= 4) {
        text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`
        caretPosition ++;
    }
        
    this.value = text;
    this.selectionStart = caretPosition;
    this.selectionEnd = caretPosition;
}