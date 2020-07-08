class Dropdown {
    constructor(dropdownHeader, quantityNumbers, buttonsSub, buttonsAdd) {

        this.dropdownHeader = dropdownHeader;
        this.quantityNumber1 = quantityNumbers[0];
        this.quantityNumber2 = quantityNumbers[1];
        this.quantityNumber3 = quantityNumbers[2];
        this.buttonSub1 = buttonsSub[0];
        this.buttonSub2 = buttonsSub[1];
        this.buttonSub3 = buttonsSub[2];
        this.buttonAdd1 = buttonsAdd[0];
        this.buttonAdd2 = buttonsAdd[1];
        this.buttonAdd3 = buttonsAdd[2];
    }

    clickAddNumberButton() {
        dropdownOptionNumber = this.previousSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number + 1

        if (number == 0)
            dropdownOptionNumber.previousSibling.disabled = false;
        
        this.generateHeader();
    }

    clickSubNumberButton() {
        dropdownOptionNumber = this.nextSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number - 1
    
        if (number == 1)
            dropdownOptionNumber.previousSibling.disabled = true;

        this.generateHeader();
    }

    generateHeader = function() {
        guestsCount = parseInt(quantityNumber1.textContent) + parseInt(quantityNumber2.textContent);
        dropdownHeader.textContent = guestsCount + ' гостей';
    }
}





/*function clickAddNumberButton() {
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
}*/

var dropdownElements = document.getElementsByClassName('dropdown__header');
/*var dropdownOptionNumber = document.getElementsByClassName('option__number');
var buttonsAdd = document.getElementsByClassName('option__add');
var buttonsSub = document.getElementsByClassName('option__subtract');*/
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

/*for (i = 0; i < dropdownOptionNumber.length; i++) {
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
}*/









var dropdowns = document.getElementsByClassName('dropdown_guests');
for (i = 0; i < dropdowns.length; i++) {
    var dropdownHeader = dropdowns[i].getElementsByClassName('dropdown__header-text')[0];
    var quantityNumbers = dropdowns[i].getElementsByClassName('dropdown__quantity-number');
    var buttonsSub = dropdowns[i].getElementsByClassName('dropdown__subtract-button');
    var buttonsAdd = dropdowns[i].getElementsByClassName('dropdown__add-button');

    let dropdown = new Dropdown(dropdownHeader, quantityNumbers, buttonsSub, buttonsAdd);
    dropdown.buttonAdd1.onclick = dropdown.clickAddNumberButton
    dropdown.buttonAdd2.onclick = dropdown.clickAddNumberButton
    dropdown.buttonAdd3.onclick = dropdown.clickAddNumberButton
    dropdown.buttonSub1.onclick = dropdown.clickSubNumberButton
    dropdown.buttonSub2.onclick = dropdown.clickSubNumberButton
    dropdown.buttonSub3.onclick = dropdown.clickSubNumberButton
}