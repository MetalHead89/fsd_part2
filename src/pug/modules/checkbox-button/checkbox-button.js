function setChecked() {
    let checkboxElement = this.previousSibling;
    checkboxElement.checked = !checkboxElement.checked;
}

let checkboxCustomElements = document.querySelectorAll('.checkbox-button__checkbox-custom-element');

for (checkbox of checkboxCustomElements)
    checkbox.onclick = setChecked;