let entryCheck = false;
const entryButtons = document.querySelectorAll(
  '.navbar__button-entry-container'
);
const registrationButtons = document.querySelectorAll(
  '.navbar__button-registration-container'
);
const accountNames = document.querySelectorAll('.navbar__item_with-name');
const separators = document.querySelectorAll('.navbar__item_with-separator');
const dropdownItems = document.querySelectorAll(
  '.navbar__dropdown-title_vertical'
);

function signIn() {
  if (entryCheck) {
    for (let button = 0; button < entryButtons.length; button += 1) {
      entryButtons[button].removeAttribute('style');
    }
    for (let button = 0; button < registrationButtons.length; button += 1) {
      registrationButtons[button].removeAttribute('style');
    }
    for (let name = 0; name < accountNames.length; name += 1) {
      accountNames[name].removeAttribute('style');
    }
    for (let separator = 0; separator < separators.length; separator += 1) {
      separators[separator].removeAttribute('style');
    }
    entryCheck = false;
  } else {
    for (let button = 0; button < entryButtons.length; button += 1) {
      entryButtons[button].style.display = 'none';
    }
    for (let button = 0; button < registrationButtons.length; button += 1) {
      registrationButtons[button].style.display = 'none';
    }
    for (let name = 0; name < accountNames.length; name += 1) {
      accountNames[name].style.display = 'flex';
      accountNames[name].style.paddingRight = 0;
    }
    for (let separator = 0; separator < separators.length; separator += 1) {
      separators[separator].style.display = 'flex';
    }
    entryCheck = true;
  }
}

for (let button = 0; button < entryButtons.length; button += 1) {
  entryButtons[button].onclick = signIn;
}

for (let name = 0; name < accountNames.length; name += 1) {
  accountNames[name].onclick = signIn;
}

for (let item = 0; item < dropdownItems.length; item += 1) {
  dropdownItems[item].onclick = () => {
    dropdownItems[item].nextElementSibling.classList.toggle(
      'navbar__hidden-list_vertical-opened'
    );
  };
}
