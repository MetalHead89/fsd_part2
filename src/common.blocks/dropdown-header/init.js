import DropdownHeader from './dropdown-header';
import DropdownHeaderStore from './dropdown-header-store';

const headers = document.querySelectorAll('.js-dropdown-header');

headers.forEach((header) => DropdownHeaderStore.addHeader(new DropdownHeader(header)));
