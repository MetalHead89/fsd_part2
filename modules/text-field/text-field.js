function changedMaskedTextField() {
    if (this.value.length == 2 || this.value.length == 5)
        this.value += '.';
    else if (this.value.length == 11)
        this.value = this.value.slice(0, -1);
}

let maskedTextField = document.querySelector('.text-field_masked');
if (maskedTextField)
    maskedTextField.oninput = changedMaskedTextField;
