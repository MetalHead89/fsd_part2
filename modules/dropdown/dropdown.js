var dropdownElements = document.getElementsByClassName('dropdown');
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