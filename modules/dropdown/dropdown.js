class GuestsDropdown {
    constructor() {
        var adults = 0
        var children = 0
        var babies = 0
    }
}





function clickAddNumberButton() {
    dropdownOptionNumber = this.previousSibling;
    number = parseInt(dropdownOptionNumber.textContent);
    dropdownOptionNumber.textContent = number + 1

    if (number == 0)
        dropdownOptionNumber.previousSibling.disabled = false;
}

function clickSubNumberButton() {
    dropdownOptionNumber = this.nextSibling;
    number = parseInt(dropdownOptionNumber.textContent);
    dropdownOptionNumber.textContent = number - 1

    if (number == 1)
        dropdownOptionNumber.previousSibling.disabled = true;
}

var dropdownElements = document.getElementsByClassName('dropdown');
var dropdownOptionNumber = document.getElementsByClassName('option__number');
var buttonsAdd = document.getElementsByClassName('option__add');
var buttonsSub = document.getElementsByClassName('option__subtract');
var optionsVisible = false

for (i = 0; i < dropdownElements.length; i++) {
    options = dropdownElements[i].nextSibling;
    dropdown = dropdownElements[i]
    dropdown.onclick = function() {
        if (optionsVisible) {
            options.style.display = "none";
            dropdown.removeAttribute("style")
        }
        else {
            options.style.display = "flex";
            dropdown.style.borderRadius = "4px 4px 0 0"
            dropdown.style.border = "1px solid rgba(31, 32, 65, 0.5)";
        }
        optionsVisible = !optionsVisible
    };
};

for (i = 0; i < dropdownOptionNumber.length; i++) {
    number = dropdownOptionNumber[i];
    if (parseInt(number.textContent) == 0) {
        number.previousSibling.disabled = true;
    }
}

for (i = 0; i < buttonsAdd.length; i++) {
    button = buttonsAdd[i];
    button.onclick = clickAddNumberButton;
}

for (i = 0; i < buttonsSub.length; i++) {
    button = buttonsSub[i];
    button.onclick = clickSubNumberButton;
}