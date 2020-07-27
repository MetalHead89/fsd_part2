const paginatonPagesNumbers = document.querySelectorAll('.pagination__page-number');
const paginatonPagesCount =  paginatonPagesNumbers[paginatonPagesNumbers.length - 1].innerText;
const pagination = document.querySelector('.pagination');
const prevButton = document.querySelector('.pagination__prev-page');
const nextButton = document.querySelector('.pagination__next-page');

if(prevButton){
    prevButton.onclick = clickToPrevButton;
}

for (page of paginatonPagesNumbers) {
    page.onclick = onClickToPageNumber;
}

function onClickToPageNumber() {
    const old_active_page = document.querySelector('.pagination__active-page');
    old_active_page.classList.remove('pagination__active-page');
    this.classList.add('pagination__active-page');

    createNewPagination.bind(this, paginatonPagesCount)();
}

function createNewPagination(pagesCount) {
    const ul = document.createElement('ul');
    const activePage = parseInt(this.innerText);
    let isLeftNumbersHidden = false;
    let isRightNumbersHidden = false;

    ul.classList.add('pagination__pages');
    pagination.append(ul);

    if (parseInt(this.innerText) != 1) {
        createPaginationButon.bind(this, ul, 'prevButton')();
    }

    for (let currentPage = 1; currentPage <= parseInt(pagesCount); currentPage++) {
        
        if (currentPage < activePage && activePage - currentPage > 2 && currentPage > 1 && activePage > 5) {
            if (!isLeftNumbersHidden) {
                createPaginationButon.bind(this, ul, 'numbersPruning')();
                isLeftNumbersHidden = true;
            }

            continue;
        }

        if (currentPage > activePage && currentPage - activePage > 2 && currentPage < pagesCount && pagesCount - activePage > 4) {
            if (!isRightNumbersHidden) {
                createPaginationButon.bind(this, ul, 'numbersPruning')();
                isRightNumbersHidden = true;
            }
            
            continue;
        }

        createPaginationButon.bind(this, ul, 'pageNumber', currentPage)();
    }

    if (parseInt(this.innerText) != pagesCount) {
        createPaginationButon.bind(this, ul, 'nextButton')();
    }

    paginationElements = document.querySelectorAll('.pagination__pages');
    paginationElements[0].remove();
}

function createPaginationButon(ul, type, page=null) {
    const a = document.createElement('a');
    a.classList.add('pagination__link');
    a.href = '#';
    ul.append(a);

    const li = document.createElement('li');

    if (type == 'prevButton' || type == 'nextButton') {
        const span = document.createElement('span');
        span.classList.add('material-icons', 'pagination__arrow');
        
        if (type == 'prevButton') {
            li.classList.add('pagination__button', 'pagination__prev-page');
            span.innerText = 'arrow_back';
            li.onclick = clickToPrevButton;
        } else {
            li.classList.add('pagination__button', 'pagination__next-page');
            span.innerText = 'arrow_forward';
        }

        li.append(span);

    } else if (type == 'numbersPruning') {
        li.classList.add('pagination__button', 'pagination__page-number');
        li.innerText = '...';
    } else if (type == 'pageNumber'){
        if (parseInt(this.innerText) == page) {
            li.classList.add('pagination__button', 'pagination__page-number', 'pagination__active-page');
        } else {
            li.classList.add('pagination__button', 'pagination__page-number');
        }

        li.innerText = page;
        li.onclick = onClickToPageNumber;
    }
    
    a.append(li);
}

function clickToPrevButton() {
    const old_active_page = document.querySelector('.pagination__active-page');
    old_active_page.classList.remove('pagination__active-page');
    console.dir(old_active_page)

/**
 * 
 * Сделать а дочерним элементом li, а не наоборот.
 * 
 * 
 * 
 * 
 */

    // this.classList.add('pagination__active-page');

    // createNewPagination.bind(this, paginatonPagesCount)();
}