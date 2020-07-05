var dropdownElements = document.getElementsByClassName('dropdown');

for (i = 0; i < dropdownElements.length; i++) {
    dropdownElements[i].onclick = function() {
        alert('Спасибо');
    };
};