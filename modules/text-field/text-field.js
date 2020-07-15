/*function getCaretPosition(ctrl) {
    if (ctrl.selectionStart || ctrl.selectionStart == '0')
        return ctrl.selectionStart;
}

function cancelInput(endPosition, text, inputText){
    return `${text.slice(0, endPosition - inputText.length)}${text.slice(endPosition)}`
}

function onKeyPressMaskedTextField(maskedTextField) {
    maskedPrevText = maskedTextField.value;
}*/


/*function deleteMaskedText(text) {
    text = text.split('.').join('');
    if (text.length >= 2 && text.length < 4)
        text = `${text.slice(0, 2)}.${text.slice(2)}`;
    else if (text.length >= 4)        
        text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`
    return text;
}*/



function onInputMaskedTextField(event, maskedTextField) {
    let caretPosition = maskedTextField.selectionStart;
    let text = maskedTextField.value;
    
    if (isNaN(text.split('.').join(''))) {
        console.log(text)
        startCaretPosition = caretPosition - event.data.length;
        console.log(startCaretPosition)
        text = `${text.slice(0, startCaretPosition)}`;
    }

    text = text.split('.').join('');

    if (text.length == 1 && parseInt(text) > 3) {
        text = `0${text}`;
        caretPosition += 1;
    }
    else if (text.length == 3 && parseInt(text.slice(-1)) > 1) {
        text = `${text.slice(0, -1)}0${text.slice(-1)}`;
        caretPosition += 1;
    }
        

    if (text.length >= 2 && text.length < 4) {
        text = `${text.slice(0, 2)}.${text.slice(2)}`;
        caretPosition += 1;
    }        
    else if (text.length >= 4) {
        text = `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4, 8)}`
        caretPosition += 2;
    }
        
    maskedTextField.value = text;
    maskedTextField.selectionStart = caretPosition;
    maskedTextField.selectionEnd = caretPosition;
    /*let date = maskedTextField.value.split('.');
    console.dir(date)
    if (date[0].length == 1 && parseInt(date[0][0]) > 3)
        date[0] = `0${date[0]}`;*/



    /*maskedTextField.value = deleteMaskedText(maskedTextField.value);
    if(event.inputType == 'deleteContentBackward' || event.inputType == 'deleteContentForward' || 
        event.inputType == 'deleteByCut' || event.inputType == 'insertFromPaste')
        maskedTextField.value = deleteMaskedText(maskedTextField.value);
    else {
        if (isNaN(parseInt(event.data)))
            maskedTextField.value = maskedTextField.value.slice(0, -1);
    
        if (maskedTextField.value.length == 1 && parseInt(maskedTextField.value) > 3)
            maskedTextField.value = '0' + maskedTextField.value;
        else if (maskedTextField.value.length == 4 && parseInt(event.data) > 1)
        {
            maskedTextField.value = `${maskedTextField.value.slice(0, -1)}0${event.data}`;
        }
            

        if (maskedTextField.value.length == 2 || maskedTextField.value.length == 5)
            maskedTextField.value += '.';
        else if (maskedTextField.value.length == 11)
            maskedTextField.value = maskedTextField.value.slice(0, -1);
    }*/









    /*event.preventDefault();*/
    /*if (isNaN(parseInt(event.data)))
        maskedTextField.value = maskedTextField.value.slice(0, -1);
    
    if (maskedTextField.value.length == 1 && parseInt(maskedTextField.value) > 3)
        maskedTextField.value = '0' + maskedTextField.value;
    else if (maskedTextField.value.length == 4 && parseInt(event.data) > 1)
    {
        maskedTextField.value = `${maskedTextField.value.slice(0, -1)}0${event.data}`;
    }
        

    if (maskedTextField.value.length == 2 || maskedTextField.value.length == 5)
        maskedTextField.value += '.';
    else if (maskedTextField.value.length == 11)
        maskedTextField.value = maskedTextField.value.slice(0, -1);*/





    /*let regexp = '';

    switch(maskedTextField.value.length){
        case 1:
            regexp = /^\d$/;
            break;
        case 2:
            regexp = /^\d\d$/;
            break;
        case 4:
            regexp = /^\d\d\.\d$/;
            break;
        case 5:
            regexp = /^\d\d\.\d\d$/;
            break;
        case 7:
            regexp = /^\d\d\.\d\d\.\d$/;
            break;
        case 8:
            regexp = /^\d\d\.\d\d\.\d\d/;
            break;
        case 9:
            regexp = /^\d\d\.\d\d\.\d\d\d$/;
            break;
        default:
            regexp = /^\d\d\.\d\d\.\d\d\d\d$/;
            break;
    }

    if(!regexp.test(maskedTextField.value))
        maskedTextField.value = cancelInput(maskedTextField.selectionStart, maskedTextField.value, event.data);
    else
        if (maskedTextField.value.length == 2 || maskedTextField.value.length == 5)
            maskedTextField.value += '.';*/



    /*if (maskedTextField.value.length == 2 || maskedTextField.value.length == 5)
        maskedTextField.value += '.';*/
}



let maskedTextField = document.querySelector('.text-field_masked');
/*let maskedPrevText = ''*/
if (maskedTextField) {
    maskedTextField.addEventListener('input', () => onInputMaskedTextField(event, maskedTextField));
    /*maskedTextField.addEventListener('keypress', () => onKeyPressMaskedTextField(maskedTextField));
    maskedTextField.addEventListener('paste', () => event.preventDefault());
    maskedTextField.addEventListener('cut', () => event.preventDefault());
    maskedTextField.addEventListener('keydown', () => changedMaskedTextField(event, maskedTextField));*/
}