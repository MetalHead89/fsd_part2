function getCaretPosition(ctrl) {
    if (ctrl.selectionStart || ctrl.selectionStart == '0')
        return ctrl.selectionStart;
}

function cancelInput(endPosition, text, inputText){
    return `${text.slice(0, endPosition - inputText.length)}${text.slice(endPosition)}`
}




function changedMaskedTextField(event, maskedTextField) {
    console.dir(event)
    alert(maskedTextField.value)
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





    let regexp = '';

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
            maskedTextField.value += '.';



    /*if (maskedTextField.value.length == 2 || maskedTextField.value.length == 5)
        maskedTextField.value += '.';*/
}



let maskedTextField = document.querySelector('.text-field_masked');
if (maskedTextField)
    maskedTextField.addEventListener('input', () => changedMaskedTextField(event, maskedTextField));