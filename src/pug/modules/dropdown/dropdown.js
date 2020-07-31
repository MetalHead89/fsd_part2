class Dropdown {
    constructor(dropdown) {
        let quantityNumbers = dropdown.getElementsByClassName('dropdown__quantity-number');
        let buttonsSub = dropdown.getElementsByClassName('dropdown__subtract-button');
        let buttonsAdd = dropdown.getElementsByClassName('dropdown__add-button');

        this.isOptionVisible = false;
        this.header = dropdown.getElementsByClassName('dropdown__header')[0];
        this.headerText = dropdown.getElementsByClassName('dropdown__header-text')[0];
        this.options = dropdown.getElementsByClassName('dropdown__options')[0];
        this.quantityNumber1 = quantityNumbers[0];
        this.quantityNumber2 = quantityNumbers[1];
        this.quantityNumber3 = quantityNumbers[2];
        this.buttonSub1 = buttonsSub[0];
        this.buttonSub2 = buttonsSub[1];
        this.buttonSub3 = buttonsSub[2];
        this.buttonAdd1 = buttonsAdd[0];
        this.buttonAdd2 = buttonsAdd[1];
        this.buttonAdd3 = buttonsAdd[2];

        this.buttonAdd1.onclick = () => this.clickAddNumberButton(this.buttonAdd1);
        this.buttonAdd2.onclick = () => this.clickAddNumberButton(this.buttonAdd2);
        this.buttonAdd3.onclick = () => this.clickAddNumberButton(this.buttonAdd3);
        this.buttonSub1.onclick = () => this.clickSubNumberButton(this.buttonSub1);
        this.buttonSub2.onclick = () => this.clickSubNumberButton(this.buttonSub2);
        this.buttonSub3.onclick = () => this.clickSubNumberButton(this.buttonSub3);
        this.header.onclick = () => this.clickHeader();

        if (dropdown.className.includes('dropdown_guests')) {
            this.buttonClear = dropdown.getElementsByClassName('dropdown__button-clear')[0];
            this.buttonApply = dropdown.getElementsByClassName('dropdown__button-apply')[0];
            this.buttonClear.onclick = () => this.clickClearButton();
            this.buttonApply.onclick = () => this.generateHeader();
            this.dropdownType = 'guests';
        }
        else
            this.dropdownType = 'comfort';
    }

    clickHeader() {
        if (this.isOptionVisible) {
            this.options.style.display = "none";
            this.header.removeAttribute("style")
        }
        else {
            this.options.style.display = "flex";
            this.header.style.borderRadius = "4px 4px 0 0";
            this.header.style.border = "1px solid rgba(31, 32, 65, 0.5)";
        }
        this.isOptionVisible = !this.isOptionVisible;
    }

    clickAddNumberButton(button) {
        dropdownOptionNumber = button.previousSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number + 1;

        if (number == 0) 
            dropdownOptionNumber.previousSibling.disabled = false;
        
        if (this.dropdownType == 'guests')
            this.setClearButton();
        this.generateHeader();
    }

    clickSubNumberButton(button) {
        dropdownOptionNumber = button.nextSibling;
        number = parseInt(dropdownOptionNumber.textContent);
        dropdownOptionNumber.textContent = number - 1;
    
        if (number == 1)
            dropdownOptionNumber.previousSibling.disabled = true;

        if (this.dropdownType == 'guests')
            this.setClearButton();
        this.generateHeader();
    }

    clickClearButton() {
        this.quantityNumber1.textContent = 0;
        this.quantityNumber2.textContent = 0;
        this.quantityNumber3.textContent = 0;
        this.buttonSub1.disabled = true;
        this.buttonSub2.disabled = true;
        this.buttonSub3.disabled = true;
        this.generateHeader();
        this.setClearButton();
    }

    generateHeader() {
        if (this.dropdownType == 'guests'){
            let guestsCount = parseInt(this.quantityNumber1.textContent) + parseInt(this.quantityNumber2.textContent);
            let babiesCount = parseInt(this.quantityNumber3.textContent);

            if (guestsCount == 0 && babiesCount == 0)
                this.headerText.textContent = 'Сколько гостей';
            else if (guestsCount > 0 && babiesCount == 0)
                this.headerText.textContent = guestsCount + ' ' + this.wordGenerator('guest', parseInt(guestsCount));
            else if (guestsCount > 0 && babiesCount > 0)
                this.headerText.textContent = `${guestsCount} ${this.wordGenerator('guest', parseInt(guestsCount))}, 
                    ${babiesCount} ${this.wordGenerator('baby', parseInt(babiesCount))}`;
        }
        else if (this.dropdownType == 'comfort') {
            let comfort = {
                'bedroomsCount': parseInt(this.quantityNumber1.textContent),
                'bedsCount': parseInt(this.quantityNumber2.textContent),
                'bathroomsCount': parseInt(this.quantityNumber3.textContent)
            };

            let headerText = '';
            for (let key in comfort) {
                if (comfort[key] > 0) {
                    if (headerText != '')
                        headerText += ', ';
                    headerText += `${comfort[key]} ${this.wordGenerator(key, comfort[key])}`;
                }
            }

            if (headerText == '')
                headerText = 'Выберите удобства'
            
            this.headerText.textContent = headerText;
        }
    }

    setClearButton() {
        if (parseInt(this.quantityNumber1.textContent) + parseInt(this.quantityNumber2.textContent) + parseInt(this.quantityNumber3.textContent) > 0) {
            this.buttonClear.style.display = 'inline-block';
        }
        else
            this.buttonClear.style.display = 'none';
    }

    wordGenerator(word, number) {
        let number10 = number % 10;
        let number100 = number % 100;
        if (number10 == 1 && number100 != 11){
            if (word == 'guest')
                return 'гость';
            else if (word == 'baby')
                return 'младенец';
            else if (word == 'bedroomsCount')
                return 'спальня';
            else if (word == 'bedsCount')
                return 'кровать';
            else if (word == 'bathroomsCount')
                return 'ванная комната';
        }
        else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14)) {
            if (word == 'guest')
                return 'гостя';
            else if (word == 'baby')
                return 'младенца';
            else if (word == 'bedroomsCount')
                return 'спальни';
            else if (word == 'bedsCount')
                return 'кровати';
            else if (word == 'bathroomsCount')
                return 'ванные комнаты';
        }
        else {
            if (word == 'guest')
                return 'гостей';
            else if (word == 'baby')
                return 'младенцев';
            else if (word == 'bedroomsCount')
                return 'спален';
            else if (word == 'bedsCount')
                return 'кроватей';
            else if (word == 'bathroomsCount')
                return 'ванных комнат';
        }
    }
}

let dr = [];
var dropdowns = document.getElementsByClassName('dropdown');
for (dropdownElement of dropdowns) {
    dr.push(new Dropdown(dropdownElement));
} 