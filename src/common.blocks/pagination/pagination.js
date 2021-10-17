/* eslint-disable comma-dangle */

class Pagination {
  constructor(pagination) {
    this._pagination = pagination;

    this._init();
    this._addEventListeners();
  }

  _init() {
    this._pagesNumbers = this._pagination.querySelectorAll(
      '.js-pagination__button_theme_numerical',
    );
    this._pagesCount = parseInt(
      this._pagesNumbers[this._pagesNumbers.length - 1].innerText,
      10,
    );
    this._prevButton = this._pagination.querySelector(
      '.js-pagination__button_with-prev-arrow',
    );
    this._nextButton = this._pagination.querySelector(
      '.js-pagination__button_with-next-arrow',
    );

    this._handleButtonWithPrevArrowClick = this._handleButtonWithPrevArrowClick.bind(
      this,
    );
    this._handleButtonWithNextArrowClick = this._handleButtonWithNextArrowClick.bind(
      this,
    );
    this._handleButtonWithNumberClick = this._handleButtonWithNumberClick.bind(
      this,
    );
  }

  _addEventListeners() {
    if (this._prevButton) {
      this._prevButton.addEventListener(
        'click',
        this._handleButtonWithPrevArrowClick,
      );
    }

    if (this._nextButton) {
      this._nextButton.addEventListener(
        'click',
        this._handleButtonWithNextArrowClick,
      );
    }

    this._pagesNumbers.forEach((item) => {
      item.addEventListener('click', this._handleButtonWithNumberClick);
    });
  }

  _handleButtonWithPrevArrowClick() {
    const oldActivePage = document.querySelector(
      '.js-pagination__button_active',
    );
    oldActivePage.classList.remove(
      'pagination__button_active',
      'js-pagination__button_active',
    );

    this._createNewPagination.bind(
      this,
      oldActivePage.previousElementSibling,
    )();
    this._createNewPaginationSignature();
  }

  _handleButtonWithNextArrowClick() {
    const oldActivePage = this._pagination.querySelector(
      '.js-pagination__button_active',
    );
    oldActivePage.classList.remove(
      'pagination__button_active',
      'js-pagination__button_active',
    );

    this._createNewPagination.bind(this, oldActivePage.nextElementSibling)();
    this._createNewPaginationSignature(this);
  }

  _handleButtonWithNumberClick(event) {
    const oldActivePage = this._pagination.querySelector(
      '.js-pagination__button_active',
    );
    oldActivePage.classList.remove(
      'pagination__button_active',
      'js-pagination__button_active',
    );

    this._createNewPagination.bind(this, event.target)();
    this._createNewPaginationSignature();
  }

  static numberDontFitOnTheLeft(currentPage, activePage) {
    return (
      currentPage < activePage &&
      activePage - currentPage > 2 &&
      currentPage > 1 &&
      activePage > 5
    );
  }

  static numberDontFitOnTheRight(currentPage, activePage, pagesCount) {
    return (
      currentPage > activePage &&
      currentPage - activePage > 2 &&
      currentPage < pagesCount &&
      pagesCount - activePage > 4
    );
  }

  _createNewPagination(button) {
    /**
     * Создаёт обновлённый элемент пагинации, удаляет старый
     */
    const ul = document.createElement('ul');
    const activePage = parseInt(button.innerText, 10);
    let isLeftNumbersHidden = false;
    let isRightNumbersHidden = false;

    ul.classList.add('pagination__pages', 'js-pagination__pages');
    this._pagination.append(ul);

    if (parseInt(button.innerText, 10) !== 1) {
      this._createPaginationButton.bind(this, button, ul, 'prevButton')();
    }

    for (
      let currentPage = 1;
      currentPage <= parseInt(this._pagesCount, 10);
      currentPage += 1
    ) {
      if (Pagination.numberDontFitOnTheLeft(currentPage, activePage)) {
        if (!isLeftNumbersHidden) {
          this._createPaginationButton.bind(
            this,
            button,
            ul,
            'numbersPruning',
          )();
          isLeftNumbersHidden = true;
        }
      } else if (
        Pagination.numberDontFitOnTheRight(
          currentPage,
          activePage,
          this._pagesCount,
        )
      ) {
        if (!isRightNumbersHidden) {
          this._createPaginationButton.bind(
            this,
            button,
            ul,
            'numbersPruning',
          )();
          isRightNumbersHidden = true;
        }
      } else {
        this._createPaginationButton.bind(
          this,
          button,
          ul,
          'pageNumber',
          currentPage,
        )();
      }
    }

    if (parseInt(button.innerText, 10) !== this._pagesCount) {
      this._createPaginationButton.bind(this, button, ul, 'nextButton')();
    }

    const paginationElements = document.querySelectorAll(
      '.js-pagination__pages',
    );
    paginationElements[0].remove();
  }

  /**
   * Создаёт новй подпись к пагинации, удаляет старую
   */
  _createNewPaginationSignature() {
    const span = document.createElement('span');
    const activePageNumber = parseInt(
      document.querySelector('.js-pagination__button_active').innerText,
      10,
    );
    let hotelRoomsTotal = (this._pagesCount - 1) * 12;
    const endHotelRoomOnPage = activePageNumber * 12;
    const startHotelRoomOnPage = endHotelRoomOnPage - 11;

    if (hotelRoomsTotal > 100) {
      hotelRoomsTotal = '100+';
    } else {
      hotelRoomsTotal = `${hotelRoomsTotal}+`;
    }

    span.classList.add(
      'pagination__signature',
      'pagination__signature_offset_top',
      'js-pagination__signature',
    );
    span.innerText = `${startHotelRoomOnPage} – ${endHotelRoomOnPage} из ${hotelRoomsTotal} вариантов аренды`;
    this._pagination.append(span);

    const paginationSignatureElements = document.querySelectorAll(
      '.js-pagination__signature',
    );
    paginationSignatureElements[0].remove();
  }

  /**
   * Добавляет кнопки в пагинацию
   */
  _createPaginationButton(button, ul, type, page = null) {
    let a = null;

    if (type !== 'numbersPruning' && parseInt(button.innerText, 10) !== page) {
      a = document.createElement('a');
      a.classList.add('pagination__link');
      a.href = '#';
    }

    const li = document.createElement('li');

    if (type === 'prevButton' || type === 'nextButton') {
      const span = document.createElement('span');
      span.classList.add('material-icons', 'pagination__arrow');

      if (type === 'prevButton') {
        li.classList.add(
          'pagination__button',
          'pagination__button_theme_movement',
          'js-pagination__button_with-prev-arrow',
        );
        span.innerText = 'arrow_back';
        li.addEventListener(
          'click',
          this._handleButtonWithPrevArrowClick,
        );
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_theme_movement',
          'js-pagination__button_with-next-arrow',
        );
        span.innerText = 'arrow_forward';
        li.addEventListener(
          'click',
          this._handleButtonWithNextArrowClick,
        );
      }

      li.append(a);
      a.append(span);
    } else if (type === 'numbersPruning') {
      li.classList.add('pagination__button');
      li.innerText = '...';
    } else if (type === 'pageNumber') {
      if (parseInt(button.innerText, 10) === page) {
        li.classList.add(
          'pagination__button',
          'pagination__button_theme_numerical',
          'js-pagination__button_theme_numerical',
          'pagination__button_active',
          'js-pagination__button_active',
        );
        li.innerText = page;
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_theme_numerical',
          'js-pagination__button_theme_numerical',
        );
        li.append(a);
        a.innerText = page;
      }

      li.addEventListener(
        'click',
        this._handleButtonWithNumberClick,
      );
    }

    ul.append(li);
  }
}

export default Pagination;
