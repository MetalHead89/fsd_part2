class Pagination {
  constructor(pagination) {
    this.pagination = pagination;

    this.init();
  }

  init() {
    this.pagesNumbers = document.querySelectorAll(
      '.pagination__button_with-number'
    );
    this.pagesCount = parseInt(
      this.pagesNumbers[this.pagesNumbers.length - 1].innerText,
      10
    );
    this.prevButton = document.querySelector(
      '.pagination__button_with-prev-arrow'
    );
    this.nextButton = document.querySelector('.pagination__button_with-number');

    if (this.prevButton) {
      this.prevButton.onclick = this.clickToPrevButton.bind(this);
    }

    if (this.nextButton) {
      this.nextButton.onclick = this.clickToNextButton.bind(this);
    }

    for (let page = 0; page < this.pagesNumbers.length; page += 1) {
      this.pagesNumbers[page].onclick = this.onClickToPageNumber.bind(
        this,
        this.pagesNumbers[page]
      );
    }
  }

  clickToPrevButton() {
    const oldActivePage = document.querySelector(
      '.pagination__button_active-page'
    );
    oldActivePage.classList.remove('pagination__button_active-page');

    this.createNewPagination.bind(this, oldActivePage.previousElementSibling)();
    this.createNewPaginationSignature.bind(this);
  }

  clickToNextButton() {
    const oldActivePage = document.querySelector(
      '.pagination__button_active-page'
    );
    oldActivePage.classList.remove('pagination__button_active-page');

    this.createNewPagination.bind(this, oldActivePage.nextElementSibling)();
    this.createNewPaginationSignature(this);
  }

  onClickToPageNumber(button) {
    const oldActivePage = document.querySelector(
      '.pagination__button_active-page'
    );
    oldActivePage.classList.remove('pagination__button_active-page');

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

    ul.classList.add('pagination__pages');
    this.pagination.append(ul);

    if (parseInt(button.innerText, 10) !== 1) {
      this.createPaginationButon.bind(this, button, ul, 'prevButton')();
    }

    for (
      let currentPage = 1;
      currentPage <= parseInt(this.pagesCount, 10);
      currentPage += 1
    ) {
      if (Pagination.numberDontFitOnTheLeft(currentPage, activePage)) {
        if (!isLeftNumbersHidden) {
          this.createPaginationButon.bind(this, button, ul, 'numbersPruning')();
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
          this.createPaginationButon.bind(this, button, ul, 'numbersPruning')();
          isRightNumbersHidden = true;
        }
      } else {
        this.createPaginationButon.bind(
          this,
          button,
          ul,
          'pageNumber',
          currentPage
        )();
      }
    }

    if (parseInt(button.innerText, 10) !== this.pagesCount) {
      this.createPaginationButon.bind(this, button, ul, 'nextButton')();
    }

    const paginationElements = document.querySelectorAll('.pagination__pages');
    paginationElements[0].remove();
  }

  /**
   * Созёт новй подпись к пагинации, удаляет старую
   */
  createNewPaginationSignature() {
    const span = document.createElement('span');
    const activePageNumber = parseInt(
      document.querySelector('.pagination__button_active-page').innerText,
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
      'pagination__signature_with-top-margin'
    );
    span.innerText = `${startHotelRoomOnPage} – ${endHotelRoomOnPage} из ${hotelRoomsTotal} вариантов аренды`;
    this.pagination.append(span);

    const paginationSignatureElements = document.querySelectorAll(
      '.pagination__signature'
    );
    paginationSignatureElements[0].remove();
  }

  /**
   * Добавляет кнопки в пагинацию
   */
  createPaginationButon(button, ul, type, page = null) {
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
          'pagination__button_with-prev-arrow'
        );
        span.innerText = 'arrow_back';
        li.onclick = this.clickToPrevButton.bind(this);
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_with-arrow',
          'pagination__button_with-next-arrow'
        );
        span.innerText = 'arrow_forward';
        li.onclick = this.clickToNextButton.bind(this);
      }

      li.append(a);
      a.append(span);
    } else if (type === 'numbersPruning') {
      li.classList.add('pagination__button', 'pagination__button_with-number');
      li.innerText = '...';
    } else if (type === 'pageNumber') {
      if (parseInt(button.innerText, 10) === page) {
        li.classList.add(
          'pagination__button',
          'pagination__button_with-number',
          'pagination__button_active-page'
        );
        li.innerText = page;
      } else {
        li.classList.add(
          'pagination__button',
          'pagination__button_with-number'
        );
        li.append(a);
        a.innerText = page;
      }

      li.onclick = this.onClickToPageNumber.bind(this, li);
    }

    ul.append(li);
  }
}

const paginations = document.querySelectorAll('.pagination');
for (let pagination = 0; pagination < paginations.length; pagination += 1) {
  pagination = new Pagination(paginations[pagination]);
}
