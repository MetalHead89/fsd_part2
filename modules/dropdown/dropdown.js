class Dropdown {
    constructor(dropdown) {
        isOptionVisible = false;
        header = dropdown.getElementsByClassName('dropdown__header')[0];
        headerText = dropdown.getElementsByClassName('dropdown__header-text')[0];
        options = dropdown.getElementsByClassName('dropdown__options')[0];
        quantityNumbers = dropdown.getElementsByClassName('dropdown__quantity-number');
        buttonsSub = dropdown.getElementsByClassName('dropdown__subtract-button');
        buttonsAdd = dropdown.getElementsByClassName('dropdown__add-button');
        buttonClear = dropdown.getElementsByClassName('dropdown__button-clear')[0];
        buttonApply = dropdown.getElementsByClassName('dropdown__button-apply')[0];

        quantityNumber1 = quantityNumbers[0];
        quantityNumber2 = quantityNumbers[1];
        quantityNumber3 = quantityNumbers[2];
        buttonSub1 = buttonsSub[0];
        buttonSub2 = buttonsSub[1];
        buttonSub3 = buttonsSub[2];
        buttonAdd1 = buttonsAdd[0];
        buttonAdd2 = buttonsAdd[1];
        buttonAdd3 = buttonsAdd[2];

        buttonAdd1.onclick = () => this.clickAddNumberButton(buttonAdd1);
        buttonAdd2.onclick = () => this.clickAddNumberButton(buttonAdd2);
        buttonAdd3.onclick = () => this.clickAddNumberButton(buttonAdd3);
        buttonSub1.onclick = () => this.clickSubNumberButton(buttonSub1);
        buttonSub2.onclick = () => this.clickSubNumberButton(buttonSub2);
        buttonSub3.onclick = () => this.clickSubNumberButton(buttonSub3);
        buttonClear.onclick = () => this.clickClearButton();
        buttonApply.onclick = () => this.generateHeader();
        header.onclick = () => this.clickHeader();
    }

    clickHeader() {
        if (isOptionVisible) {
            options.style.display = "none";
            header.removeAttribute("style")
        }
        else {
            options.style.display = "flex";
            header.style.borderRadius = "4px 4px 0 0";
            header.style.border = "1px solid rgba(31, 32, 65, 0.5)";
        }
        isOptionVisible = !isOptionVisible;
    }

    clickAddNumberButton(button) {
        dropdownOptionNumber = button.previousSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number + 1

        if (number == 0) 
            dropdownOptionNumber.previousSibling.disabled = false;
        
        this.setClearButton();
        this.generateHeader();
    }

    clickSubNumberButton(button) {
        dropdownOptionNumber = button.nextSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number - 1
    
        if (number == 1)
            dropdownOptionNumber.previousSibling.disabled = true;

        this.setClearButton();
        this.generateHeader();
    }

    clickClearButton() {
        quantityNumber1.textContent = 0;
        quantityNumber2.textContent = 0;
        quantityNumber3.textContent = 0;
        buttonSub1.disabled = true
        buttonSub2.disabled = true
        buttonSub3.disabled = true
        this.generateHeader();
        this.setClearButton();
    }

    generateHeader() {
        guestsCount = parseInt(quantityNumber1.textContent) + parseInt(quantityNumber2.textContent);
        babiesCount = parseInt(quantityNumber3.textContent);

        if (guestsCount == 0 && babiesCount == 0)
            headerText.textContent = 'Сколько гостей';
        else if (guestsCount > 0 && babiesCount == 0)
            headerText.textContent = guestsCount + ' ' + this.wordGenerator('guest', parseInt(guestsCount));
        else if (guestsCount > 0 && babiesCount > 0)
            headerText.textContent = `${guestsCount} ${this.wordGenerator('guest', parseInt(guestsCount))}, 
                ${babiesCount} ${this.wordGenerator('baby', parseInt(babiesCount))}`;
    }

    setClearButton() {
        if (parseInt(quantityNumber1.textContent) + parseInt(quantityNumber2.textContent) + parseInt(quantityNumber3.textContent) > 0) {
            buttonClear.style.display = 'inline-block';
        }
        else
            buttonClear.style.display = 'none';
    }

    wordGenerator(word, number) {
        number10 = number % 10;
        number100 = number % 100;
        if (number10 == 1 && number100 != 11){
            if (word == 'guest')
                return 'гость';
            else if (word == 'baby')
                return 'младенец'
        }
        else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14)) {
            if (word == 'guest')
                return 'гостя';
            else if (word == 'baby')
                return 'младенца'
        }
        else {
            if (word == 'guest')
                return 'гостей';
            else if (word == 'baby')
                return 'младенцев'
        }
    }
}

let dr = [];
var dropdowns = document.getElementsByClassName('dropdown');
for (dropdownElement of dropdowns) {
    dr.push(new Dropdown(dropdownElement));
} 