let isEntryCheck = false;
const entryButtons = document.querySelectorAll(
  '.js-navbar__button-entry-container'
);
const registrationButtons = document.querySelectorAll(
  '.js-navbar__button-registration-container'
);
const accountNames = document.querySelectorAll('.js-navbar__item_with-name');
const separators = document.querySelectorAll('.js-navbar__item_with-separator');
const dropdownItems = document.querySelectorAll(
  '.js-navbar__dropdown-title_vertical'
);
dropdownItems.forEach((item) => {
  item.nextElementSibling.classList.toggle(
    'navbar__hidden-list_vertical-closed'
  );
});

function signIn() {
  if (isEntryCheck) {
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
    isEntryCheck = false;
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
    isEntryCheck = true;
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
    dropdownItems[item].nextElementSibling.classList.toggle(
      'navbar__hidden-list_vertical-closed'
    );
  };
}
