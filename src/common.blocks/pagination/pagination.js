/* eslint-disable comma-dangle */

class Pagination {
  constructor(pagination) {
    this.pagination = pagination;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.pagesNumbers = this.pagination.querySelectorAll(
      '.js-pagination__button_with-number'
    );
    this.pagesCount = parseInt(
      this.pagesNumbers[this.pagesNumbers.length - 1].innerText,
      10
    );
    this.prevButton = this.pagination.querySelector(
      '.js-pagination__button_with-prev-arrow'
    );
    this.nextButton = this.pagination.querySelector(
      '.js-pagination__button_with-next-arrow'
    );
  }

  addEventListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener(
        'click',
        this.handleButtonWithPrevArrowClick.bind(this)
      );
    }

    if (this.nextButton) {
      this.nextButton.addEventListener(
        'click',
        this.handleButtonWithNextArrowClick.bind(this)
      );
    }

    this.pagesNumbers.forEach((item) => {
      item.addEventListener(
        'click',
        this.handleButtonWithNumberClick.bind(this, item)
      );
    });
  }

  handleButtonWithPrevArrowClick() {
    const oldActivePage = document.querySelector(
      '.js-pagination__button_active-page'
    );
    oldActivePage.classList.remove(
      'pagination__button_active-page',
      'js-pagination__button_active-page'
    );

    this.createNewPagination.bind(this, oldActivePage.previousElementSibling)();
    this.createNewPaginationSignature.bind(this);
  }

  handleButtonWithNextArrowClick() {
    const oldActivePage = document.querySelector(
      '.js-pagination__button_active-page'
    );
    oldActivePage.classList.remove(
      'pagination__button_active-page',
      'js-pagination__button_active-page'
    );

    this.createNewPagination.bind(this, oldActivePage.nextElementSibling)();
    this.createNewPaginationSignature(this);
  }

  handleButtonWithNumberClick(button) {
    const oldActivePage = document.querySelector(
      '.js-pagination__button_active-page'
    );
    oldActivePage.classList.remove(
      'pagination__button_active-page',
      'js-pagination__button_active-page'
    );

    this.createNewPagination.bind(this, button)();
    this.createNewPaginationSignature(this);
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

  createNewPagination(button) {
    /**
     * Создаёт обновлённый элемент пагинации, удаляет старый
     */
    const ul = document.createElement('ul');
    const activePage = parseInt(button.innerText, 10);
    let isLeftNumbersHidden = false;
    let isRightNumbersHidden = false;

    ul.classList.add('pagination__pages', 'js-pagination__pages');
    this.pagination.append(ul);

    if (parseInt(button.innerText, 10) !== 1) {
      this.createPaginationButton.bind(this, button, ul, 'prevButton')();
    }

    for (
      let currentPage = 1;
      currentPage <= parseInt(this.pagesCount, 10);
      currentPage += 1
    ) {
      if (Pagination.numberDontFitOnTheLeft(currentPage, activePage)) {
        if (!isLeftNumbersHidden) {
          this.createPaginationButton.bind(
            this,
            button,
            ul,
            'numbersPruning'
          )();
          isLeftNumbersHidden = true;
        }
      } else if (
        Pagination.numberDontFitOnTheRight(
          currentPage,
          activePage,
          this.pagesCount
        )
      ) {
        if (!isRightNumbersHidden) {
          this.createPaginationButton.bind(
            this,
            button,
            ul,
            'numbersPruning'
          )();
          isRightNumbersHidden = true;
        }
      } else {
        this.createPaginationButton.bind(
          this,
          button,
          ul,
          'pageNumber',
          currentPage
        )();
      }
    }

    if (parseInt(button.innerText, 10) !== this.pagesCount) {
      this.createPaginationButton.bind(this, button, ul, 'nextButton')();
    }

    const paginationElements = document.querySelectorAll(
      '.js-pagination__pages'
    );
    paginationElements[0].remove();
  }

  /**
   * Создаёт новй подпись к пагинации, удаляет старую
   */
  createNewPaginationSignature() {
    const span = document.createElement('span');
    const activePageNumber = parseInt(
      document.querySelector('.js-pagination__button_active-page').innerText,
      10
    );
    let hotelRoomsTotal = (this.pagesCount - 1) * 12;
    const endHotelRoomOnPage = activePageNumber * 12;
    const startHotelRoomOnPage = endHotelRoomOnPage - 11;

    if (hotelRoomsTotal > 100) {
      hotelRoomsTotal = '100+';
    } else {
      hotelRoomsTotal = `${hotelRoomsTotal}+`;
    }

    span.classList.add(
      'pagination__signature',
      'pagination__signature_with-top-margin',
      'js-pagination__signature'
    );
    span.innerText = `${startHotelRoomOnPage} – ${endHotelRoomOnPage} из ${hotelRoomsTotal} вариантов аренды`;
    this.pagination.append(span);

    const paginationSignatureElements = document.querySelectorAll(
      '.js-pagination__signature'
    );
    paginationSignatureElements[0].remove();
  }

  /**
   * Добавляет кнопки в пагинацию
   */
  createPaginationButton(button, ul, type, page = null) {
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
          'pagination__button_with-arrow',
          'js-pagination__button_with-prev-arrow'
        );
        span.innerText = 'arrow_back';
        li.addEventListener(
          'click',
          this.handleButtonWithPrevArrowClick.bind(this)
        );
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_with-arrow',
          'js-pagination__button_with-next-arrow'
        );
        span.innerText = 'arrow_forward';
        li.addEventListener(
          'click',
          this.handleButtonWithNextArrowClick.bind(this)
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
          'pagination__button_with-number',
          'js-pagination__button_with-number',
          'pagination__button_active-page',
          'js-pagination__button_active-page'
        );
        li.innerText = page;
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_with-number',
          'js-pagination__button_with-number'
        );
        li.append(a);
        a.innerText = page;
      }

      li.addEventListener(
        'click',
        this.handleButtonWithNumberClick.bind(this, li)
      );
    }

    ul.append(li);
  }
}

export default Pagination;
