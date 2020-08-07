'use strict'

const dropdowns = document.querySelectorAll('.dropdown__header');
const quantityButtons = document.querySelectorAll('.dropdown__quantity-button');
const clearButons = document.querySelectorAll('.dropdown__button-clear');

for (let dropdown of dropdowns) {
    if (!dropdown.offsetParent.classList.contains('dropdown_date'))
        dropdown.onclick = showHideOptions;
}

for (let button of quantityButtons) {
    button.onclick = changQuantity;
}

for (let button of clearButons) {
    button.firstElementChild.firstElementChild.onclick = resetOptionsValues;
}

function showHideOptions() {
    /**
     * Разворачивает/сворачивает dropdown
     */

    const options = this.nextElementSibling;

    if (options.style.display == '') {
        options.style.display = 'flex';
        this.style.borderRadius = "4px 4px 0 0";
        this.style.border = "1px solid rgba(31, 32, 65, 0.5)";

        for (let dropdown of dropdowns) {
            if (dropdown !== this) {
                dropdown.nextElementSibling.removeAttribute('style');
                dropdown.removeAttribute('style');
            }
        }
    } else {
        options.removeAttribute('style');
        this.removeAttribute('style');
    }
}

function changQuantity() {
    /**
     * Изменяет количество выбранной опции на единицу в большую или меньшую сторону
     */

    if (this.classList.contains('dropdown__add-button')) {
        const quantityElement = this.previousElementSibling;

        quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
    } else {
        const quantityElement = this.nextElementSibling;

        quantityElement.innerText = parseInt(quantityElement.innerText) - 1;
    }

    changeButtonsState(this.offsetParent);
    changeDropdownHeader(this.offsetParent);
}

function changeButtonsState(options) {
    /**
     * Изменяет состояние кнопок
     */

    const quantityElements = options.querySelectorAll('.dropdown__quantity-number');
    let quantitySum = 0;

    for (let quantity of quantityElements) {
        let quantityNumber = parseInt(quantity.innerText);

        if (parseInt(quantityNumber) > 0) {
            quantity.previousElementSibling.disabled = false;
        } else {
            quantity.previousElementSibling.disabled = true;
        }

        quantitySum += quantityNumber;
    }

    if (options.querySelector('.button ')) {
        const buttonClear = options.querySelector('.button ').children[0];

        if (quantitySum > 0) {
            buttonClear.style.display = 'inline-block'
        } else {
            buttonClear.removeAttribute('style');
        }
    }
}

function resetOptionsValues() {
    /**
     * Сбрасывет все значения dropdown на дефолтные
     */

    const options = this.parentElement.parentElement.offsetParent;
    const quantityElements = options.querySelectorAll('.dropdown__quantity-number');
    this.removeAttribute('style');

    for (let quantity of quantityElements) {
        quantity.innerText = '0'
        quantity.previousElementSibling.disabled = true;
    }

    changeDropdownHeader(options);
}

function changeDropdownHeader(options) {
    /**
     * Изеняет текст хедера dropdown элемента
     */

    const dropdown = options.offsetParent;
    const header = options.previousElementSibling.firstElementChild;
    const quantityNumbers = options.querySelectorAll('.dropdown__quantity-number');

    if (dropdown.classList.contains('dropdown_guests')) {
        const guests = {
            'guests': parseInt(quantityNumbers[0].innerText) + parseInt(quantityNumbers[1].innerText),
            'babies': parseInt(quantityNumbers[2].innerText)
        };

        let headerText = '';
        for (let key in guests) {
            if (guests[key] > 0) {
                if (headerText != '')
                    headerText += ', ';
                headerText += `${guests[key]} ${wordGenerator(key, guests[key])}`;
            }
        }

        if (headerText == '')
            headerText = 'Сколько гостей'

        header.textContent = headerText;
    } else if (dropdown.classList.contains('dropdown_comfort')) {
        let comfort = {
            'bedroomsCount': parseInt(quantityNumbers[0].innerText),
            'bedsCount': parseInt(quantityNumbers[1].innerText),
            'bathroomsCount': parseInt(quantityNumbers[2].innerText)
        };

        let headerText = '';
        for (let key in comfort) {
            if (comfort[key] > 0) {
                if (headerText != '')
                    headerText += ', ';
                headerText += `${comfort[key]} ${wordGenerator(key, comfort[key])}`;
            }
        }

        if (headerText == '')
            headerText = 'Выберите удобства'

        header.textContent = headerText;
    }
}

function wordGenerator(word, number) {
    /**
     * Склоняет слова
     */
    let number10 = number % 10;
    let number100 = number % 100;
    if (number10 == 1 && number100 != 11) {
        if (word == 'guests')
            return 'гость';
        else if (word == 'babies')
            return 'младенец';
        else if (word == 'bedroomsCount')
            return 'спальня';
        else if (word == 'bedsCount')
            return 'кровать';
        else if (word == 'bathroomsCount')
            return 'ванная комната';
    }
    else if ((number10 >= 2 && number10 <= 4) && !(number100 >= 12 && number100 <= 14)) {
        if (word == 'guests')
            return 'гостя';
        else if (word == 'babies')
            return 'младенца';
        else if (word == 'bedroomsCount')
            return 'спальни';
        else if (word == 'bedsCount')
            return 'кровати';
        else if (word == 'bathroomsCount')
            return 'ванные комнаты';
    }
    else {
        if (word == 'guests')
            return 'гостей';
        else if (word == 'babies')
            return 'младенцев';
        else if (word == 'bedroomsCount')
            return 'спален';
        else if (word == 'bedsCount')
            return 'кроватей';
        else if (word == 'bathroomsCount')
            return 'ванных комнат';
    }
}