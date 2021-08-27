// import Dropdown from '../../js/dropdown';

// class DateDropdown extends Dropdown {
//   constructor(dropdown) {
//     super(dropdown, 'date-dropdown');
//   }

//   _init() {
//     super._init();

//     this._handleStartDateInputOnfocus = this._handleStartDateInputOnfocus.bind(
//       this
//     );
//     this._handleEndDateInputOnfocus = this._handleEndDateInputOnfocus.bind(
//       this
//     );

//     this._dropdownStartDay = this._dropdown
//       .querySelector('.js-date-dropdown__start-date-input')
//       .querySelector('.js-text-field__field');
//     this._dropdownEndDay = this._dropdown
//       .querySelector('.js-date-dropdown__end-date-input')
//       .querySelector('.js-text-field__field');
//   }

//   _addEventListeners() {
//     super._addEventListeners();

//     this._dropdownStartDay.addEventListener(
//       'focus',
//       this._handleStartDateInputOnfocus
//     );
//     this._dropdownEndDay.addEventListener(
//       'focus',
//       this._handleEndDateInputOnfocus
//     );
//   }

//   _handleStartDateInputOnfocus() {
//     this._openDateDropdown();
//   }

//   _handleEndDateInputOnfocus() {
//     this._openDateDropdown();
//   }

//   _openDateDropdown() {
//     this._closeOtherDropdowns();
//     this._dropCheck.checked = true;
//   }
// }

// export default DateDropdown;
