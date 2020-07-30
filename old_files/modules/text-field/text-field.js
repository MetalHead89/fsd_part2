function getTextWithoutDots(text) {
    // Убирает все точки в тексте
    // 16.07.2020 => 16072020

    return text.split('.').join('');
}

function onPastetMaskedTextField() {
    // Проверяет, что вставляемый текст содержит в себе только цифры и точки.
    // В случае неудачной проверки отменяет вставку

    clipboardData = event.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    if (isNaN(getTextWithoutDots(pastedData)))
        event.preventDefault();
}

function onKeydowMaskedTextField(event, maskedTextField) {
    // Сдвигает каретку во время удаления, если она стоит до или перед точкой
    
    if (event.key == 'Backspace' && maskedTextField.selectionStart == maskedTextField.selectionEnd && 
    maskedTextField.value.substr(maskedTextField.selectionStart - 1, 1) == '.') {
        maskedTextField.selectionStart--;
        maskedTextField.selectionEnd--;
    }
    if (event.key == 'Delete' && maskedTextField.selectionStart == maskedTextField.selectionEnd && 
    maskedTextField.value.substr(maskedTextField.selectionStart, 1) == '.') {
        maskedTextField.selectionStart++;
        maskedTextField.selectionEnd++;
    }
}

function onInputMaskedTextField(event, maskedTextField) {
    let caretPosition = maskedTextField.selectionStart;
    let text = maskedTextField.value;
    
    if (isNaN(getTextWithoutDots(text))) {
        startCaretPosition = caretPosition - event.data.length;
        text = `${text.slice(0, startCaretPosition)}${text.slice(caretPosition)}`;
        if (text.length > 1)
            caretPosition -= 2;
        else
            caretPosition--;
    }

    if (event.inputType == 'deleteContentBackward' && text.length > 2) {
        caretPosition--;
    }

    if (event.inputType == 'deleteContentForward' && text.length > 2) {
        caretPosition--;
    }

    text = getTextWithoutDots(text);

    /*if (text[0] && parseInt(text[0]) > 3) {
        text = `0${text}`;
        caretPosition++; 
    }

    if (text[2] && parseInt(text[2]) > 1) {
        text = `${text.slice(0, 2)}0${text.slice(2)}`
        caretPosition ++;
    }*/
    
    if (text.length >= 2 && text.length < 4) {
        text = `${text.slice(0, 2)}.${text.slice(2)}`;
        caretPosition ++;
    }
    else if (text.length >= 4) {
        text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`
        caretPosition ++;
    }
        
    maskedTextField.value = text;
    maskedTextField.selectionStart = caretPosition;
    maskedTextField.selectionEnd = caretPosition;
}

let maskedTextField = document.querySelector('.text-field_masked');
if (maskedTextField) {
    maskedTextField.addEventListener('input', () => onInputMaskedTextField(event, maskedTextField));
    maskedTextField.addEventListener('paste', () => onPastetMaskedTextField(event, maskedTextField));
    maskedTextField.addEventListener('keydown', () => onKeydowMaskedTextField(event, maskedTextField));
}