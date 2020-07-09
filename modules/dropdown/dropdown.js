class Dropdown {
    constructor(dropdownHeader, quantityNumbers, buttonsSub, buttonsAdd, buttonClear, buttonApply) {

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
        this.buttonClear = buttonClear;
        this.buttonApply = buttonApply;
    }

    clickAddNumberButton(button) {
        dropdownOptionNumber = button.previousSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number + 1

        if (number == 0) 
            dropdownOptionNumber.previousSibling.disabled = false;
        
        this.setClearButton();
    }

    clickSubNumberButton(button) {
        dropdownOptionNumber = button.nextSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number - 1
    
        if (number == 1)
            dropdownOptionNumber.previousSibling.disabled = true;

        this.setClearButton();
    }

    clickClearButton() {
        this.quantityNumber1.textContent = 0;
        this.quantityNumber2.textContent = 0;
        this.quantityNumber3.textContent = 0;
        this.generateHeader();
        this.setClearButton();
    }

    generateHeader() {
        guestsCount = parseInt(this.quantityNumber1.textContent) + parseInt(this.quantityNumber2.textContent);
        dropdownHeader.textContent = guestsCount + ' ' + this.wordGenerator('guest', parseInt(guestsCount));
    }

    setClearButton() {
        if (parseInt(this.quantityNumber1.textContent) + parseInt(this.quantityNumber2.textContent) + parseInt(this.quantityNumber3.textContent) > 0) {
            this.buttonClear.style.display = 'inline-block';
        }
        else
            this.buttonClear.style.display = 'none';
    }

    wordGenerator(word, number) {
        number10 = number % 10;
        number100 = number % 100;
        if (number10 == 1 && number100 != 11)
            return 'гость';
        else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14))
            return 'гостя';
        else
            return 'гостей';
            
    }
}

var dropdownElements = document.getElementsByClassName('dropdown__header');
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

var dropdowns = document.getElementsByClassName('dropdown_guests');
for (i = 0; i < dropdowns.length; i++) {
    var dropdownHeader = dropdowns[i].getElementsByClassName('dropdown__header-text')[0];
    var quantityNumbers = dropdowns[i].getElementsByClassName('dropdown__quantity-number');
    var buttonsSub = dropdowns[i].getElementsByClassName('dropdown__subtract-button');
    var buttonsAdd = dropdowns[i].getElementsByClassName('dropdown__add-button');
    var buttonClear = dropdowns[i].getElementsByClassName('dropdown__button-clear')[0];
    var buttonApply = dropdowns[i].getElementsByClassName('dropdown__button-apply')[0];

    let dropdown = new Dropdown(dropdownHeader, quantityNumbers, buttonsSub, buttonsAdd, buttonClear, buttonApply);
    dropdown.buttonAdd1.onclick = function() {dropdown.clickAddNumberButton(dropdown.buttonAdd1)};
    dropdown.buttonAdd2.onclick = function() {dropdown.clickAddNumberButton(dropdown.buttonAdd2)};
    dropdown.buttonAdd3.onclick = function() {dropdown.clickAddNumberButton(dropdown.buttonAdd3)};
    dropdown.buttonSub1.onclick = function() {dropdown.clickSubNumberButton(dropdown.buttonSub1)};
    dropdown.buttonSub2.onclick = function() {dropdown.clickSubNumberButton(dropdown.buttonSub2)};
    dropdown.buttonSub3.onclick = function() {dropdown.clickSubNumberButton(dropdown.buttonSub3)};
    dropdown.buttonClear.onclick = function() {dropdown.clickClearButton()};
    dropdown.buttonApply.onclick = function() {dropdown.generateHeader()};
}