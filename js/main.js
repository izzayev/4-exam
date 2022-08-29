let elBody = document.querySelector("#main__body");
let elFormSearch = document.querySelector(".header__form");
let elInputSearch = document.querySelector(".search__input");
let elBtnDarkmode = document.querySelector(".btn_dark");
let elBtnOrder = document.querySelector(".order__btn");
let elResult = document.querySelector(".result__span");
let elBooksList = document.querySelector(".book__cards");
let elBookTemplate = document.querySelector("#bookcard__template").content;
let elBookMarkList = document.querySelector(".cards__wrapper");
let elBookmarkTemp = document.querySelector("#bookmark__template").content;


// SEARCH RENDER BOOK
elFormSearch.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    let searchInputValue = elInputSearch.value.trim()
    console.log(elInputSearch.value);
    if (searchInputValue.length > 1) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}`, {
        method: "GET", })
        .then(ren => ren.json())
        .then(data => { 
            renderBooks(data.items)
            elResult.textContent = data.totalItems
        })
    }
})

elBtnOrder.addEventListener("click" , function() {
    let searchInputValue = elInputSearch.value.trim()
    
    if (searchInputValue.length > 1) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputValue}&orderBy=newest`, )
        .then(ren => ren.json())
        .then(data => { 
            renderBooks(data.items)
            elResult.textContent = data.totalItems
        })
    }
})

function renderBooks(array) {
    
    elBooksList.innerHTML = null
    
    let newFragment = document.createDocumentFragment()
    
    for (const item of array) {
        
        let templateCard = elBookTemplate.cloneNode(true)
        
        templateCard.querySelector(".book__img").src = item.volumeInfo.imageLinks.thumbnail
        templateCard.querySelector(".book__heading").textContent = item.volumeInfo.title
        templateCard.querySelector(".book__text").textContent = item.volumeInfo.authors
        templateCard.querySelector(".book__year").textContent = item.volumeInfo.publishedDate
        templateCard.querySelector(".btn__top1").dataset.bookmarkId = item.id
        templateCard.querySelector(".btn__top2").dataset.infoId = item.id
        templateCard.querySelector(".btn__bottom").href = item.volumeInfo.previewLink
        templateCard.querySelector(".btn__bottom").dataset.readId = item.id
        
        newFragment.appendChild(templateCard)
    }
    
    elBooksList.appendChild(newFragment)
}

function renderBookmarks(array) {
    
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {
        
        let bookmarkTemplate = elBookmarkTemp.cloneNode(true)
        
        bookmarkTemplate.querySelector(".wrapper__heading").textContent = item.volumeInfo.title
        bookmarkTemplate.querySelector(".wrapper__text").textContent = item.volumeInfo.authors
        bookmarkTemplate.querySelector(".btn__book").href = item.volumeInfo.previewLink
        bookmarkTemplate.querySelector(".btn__del").dataset.deleteId = item.id
        bookmarkTemplate.querySelector(".cards__item").classList.add(`del${item.id}`)
        bookmarkTemplate.querySelector(".btn__del__img").dataset.deleteId = item.id
        
        newFragment.appendChild(bookmarkTemplate)
    }
    
    elBookMarkList.appendChild(newFragment)
}

let localArray = [];

elBooksList.addEventListener("click", function(evt) {
    let bookmarkBtn = evt.target.dataset.bookmarkId
    
    let boomarkWrapper = evt.target.closest(".book__card");
    if (bookmarkBtn) {
        if (localArray.length == 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookmarkBtn}`, {
            method: "GET", })
            .then(ren => ren.json())
            .then(data => { 
                if (!data.error) {
                    localArray.push(data)
                    console.log(localArray);
                    renderBooks(localArray, elBookMarkList)
                }
            })
        } else if (!localArray.find(items => items.id == bookmarkBtn)) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookmarkBtn}`, {
            method: "GET", })
            .then(ren => ren.json())
            .then(data => { 
                if (!data.error) {
                    localArray.push(data)
                    console.log(localArray);
                    renderBooks(localArray, elBookMarkList)
                }
            })
        }
    }
})

//  DARK MODE
elBtnDarkmode.addEventListener("click", function() {
    elBody.classList.toggle("dark__mode")
    console.log(tru);
})