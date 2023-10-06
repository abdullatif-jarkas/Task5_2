// cart
let closeBtn = document.querySelector(".cart .btn-close");
let cart = document.querySelector(".cart");
let shoppingCart = document.querySelector(".shopping-cart");
let cartOverlay = document.querySelector(".cart-overlay");

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

shoppingCart.addEventListener("click", () => {
  cart.classList.add("cart-shown");
  cartOverlay.classList.add("overlay-shown");
  disableScroll();
});
closeBtn.addEventListener("click", () => {
  cart.classList.remove("cart-shown");
  cartOverlay.classList.remove("overlay-shown");
  enableScroll();
});

// Flags List API
let flagsMenu = document.querySelector(".flags-menu");
fetch("https://restcountries.com/v3.1/all")
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    for (let index = 0; index < 100; index++) {
      flagsMenu.innerHTML += `
        <li class="my-2 py-1 border-bottom"><a class="dropdown-item d-flex justify-content-between" href="#">${res[index].flag} <img src=${res[index].flags.png} alt='flag-image'></a></li>
      `;
    }
    let flagsBtn = document.querySelector(".flags-btn");
    let flagsItems = document.querySelectorAll(".flags-menu li");
    flagsBtn.innerHTML = `
      <div>${res[98].flag} <img src=${res[98].flags.png}></div>
    `;
    flagsItems.forEach((item) => {
      item.addEventListener("click", () => {
        flagsBtn.innerHTML = `
        ${item.innerHTML}
        `;
      });
    });
    flagsBtn.addEventListener("click", () => {
      flagsMenu.classList.toggle("menu-shown");
    });
  });

// Showing Sidebar
let togglerBtn = document.querySelector(".nav-menu-item");
let firstSpan = document.querySelector(".nav-menu-item .one");
let SecondSpan = document.querySelector(".nav-menu-item .two");
let thirdSpan = document.querySelector(".nav-menu-item .three");

let sideBar = document.querySelector(".sidebar");
togglerBtn.addEventListener("click", () => {
  sideBar.classList.toggle("show");
  firstSpan.classList.toggle("one-hover")
  SecondSpan.classList.toggle("two-hover")
  thirdSpan.classList.toggle("three-hover")
});

// Showing Collection and Pages list in sidebar
let collectionItem = document.querySelector(".collection-item");
let collection = document.querySelector(".collection");
let pagesItem = document.querySelector(".pages-item");
let pages = document.querySelector(".pages");

collectionItem.addEventListener("click", () => {
  collection.style.right = 0;
});
pagesItem.addEventListener("click", () => {
  pages.style.right = 0;
});

// removing collection and Pages list
let collectionBackBtn = document.querySelector(".collection-back-btn");
let pagesBackBtn = document.querySelector(".pages-back-btn");

collectionBackBtn.addEventListener("click", () => {
  collection.style.right = `${120}%`;
});
pagesBackBtn.addEventListener("click", () => {
  pages.style.right = `${120}%`;
});

// Collection link hover (in xl media)
let collectionLink = document.querySelector(".collection-link");
let collectionList = document.querySelector(".collection-list");

collectionLink.addEventListener("mouseover", () => {
  collectionList.style.opacity = 1;
  collectionList.style.zIndex = 4;
});
collectionLink.addEventListener("mouseout", () => {
  collectionList.style.opacity = 0;
  collectionList.style.zIndex = 0;
});
collectionList.addEventListener("mouseover", () => {
  collectionList.style.opacity = 1;
  collectionList.style.zIndex = 4;
});
collectionList.addEventListener("mouseout", () => {
  collectionList.style.opacity = 0;
  collectionList.style.zIndex = 0;
});

// Pages link hover (in xl media)
let pagesLink = document.querySelector(".pages-link");
let pagesList = document.querySelector(".pages-list");

pagesLink.addEventListener("mouseover", () => {
  pagesList.style.opacity = 1;
  pagesList.style.zIndex = 4;
});
pagesLink.addEventListener("mouseout", () => {
  pagesList.style.opacity = 0;
  pagesList.style.zIndex = 0;
});
pagesList.addEventListener("mouseover", () => {
  pagesList.style.opacity = 1;
  pagesList.style.zIndex = 4;
});
pagesList.addEventListener("mouseout", () => {
  pagesList.style.opacity = 0;
  pagesList.style.zIndex = 0;
});

// Modal close button
let modalCloseBtn = document.querySelectorAll(".close-modal-btn");
let modal = document.querySelectorAll(".modal");
modalCloseBtn.forEach((element) => {
  element.addEventListener("click", () => {
    modal.forEach((el) => {
      let modalBackdrop = document.querySelectorAll(".modal-backdrop");
      modalBackdrop.forEach((back) => {
        back.style.opacity = 0;
      });
      el.classList.remove("show");
    });
  });
});

// Arrival API

fetch("https://dummyjson.com/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    arrivalCards(res.products);
  });
function arrivalCards(arr) {
  for (let index = 4; index < 10; index++) {
    swiperContainer.innerHTML += `
    <!-- Start Cards -->
    <div class="swipe-card border d-flex flex-column">
    <div class="card-header position-relative overflow-hidden">
    <img src=${arr[index].images[0]} class="w-100 object-fit-cover" alt="">
    <div class="add-to-cart d-flex justify-content-center align-items-center bg-dark w-100">
    <a class="text-decoration-none text-white p-2" onclick="addToCart(${arr[index].images[0]})">Add To Cart</a>
    </div>
    </div>
    <div class="card-body d-flex flex-column justify-content-center align-items-center p-1">
    <h4 class="text-center">${arr[index].title}</h4>
    <div class="stars">
    </div>
    <span class="main-color fs-5">$${arr[index].price}</span>
    </div>
    </div>
    `;
  }
}


// Arrival Swiper

let swiperContainer = document.querySelector(".swiper-container");
let prevBtn = document.querySelector(".prev-btn-container");
let nextBtn = document.querySelector(".next-btn-container");

let swiperLeftValue = 0;

prevBtn.addEventListener("click", () => {
  if (swiperLeftValue < 0) {
    swiperLeftValue += 251;
    swiperContainer.style.left = `${swiperLeftValue}px`;
  }
});
nextBtn.addEventListener("click", () => {
  if (window.innerWidth > 270 && window.innerWidth < 518) {
    if (swiperLeftValue > -251 * 5) {
      swiperLeftValue -= 251;
      swiperContainer.style.left = `${swiperLeftValue}px`;
    }
  } else if (window.innerWidth >= 518 && window.innerWidth < 768) {
    if (swiperLeftValue > -251 * 4) {
      swiperLeftValue -= 251;
      swiperContainer.style.left = `${swiperLeftValue}px`;
    }
  } else if (window.innerWidth > 768 && window.innerWidth < 1014) {
    if (swiperLeftValue > -251 * 3) {
      swiperLeftValue -= 251;
      swiperContainer.style.left = `${swiperLeftValue}px`;
    }
  } else {
    if (swiperLeftValue > -251 * 2) {
      swiperLeftValue -= 251;
      swiperContainer.style.left = `${swiperLeftValue}px`;
    }
  }
});


// Customers Accordion
let accordionBtn = document.querySelectorAll(".customers .accordion-button");
accordionBtn.forEach((item, index) => {
  let menuItem = document.querySelector(`.menu-item-${index}`);
  if (menuItem.parentElement.classList.contains("collapsed")) {
    menuItem.innerHTML = `
    <div class="menu-item">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
    </div>
    `;
  } else {
    menuItem.innerHTML = `<i class="fa-solid fa-x fs-3"></i>`;
  }
  item.addEventListener("click", () => {
    if (menuItem.parentElement.classList.contains("collapsed")) {
      menuItem.innerHTML = `
      <div class="menu-item menu-item-3">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
      </div>
      `;
    } else {
      menuItem.innerHTML = `<i class="fa-solid fa-x fs-3"></i>`;
    }
    accordionBtn.forEach((item, index) => {
      let menuItem = document.querySelector(`.menu-item-${index}`);
      if (menuItem.parentElement.classList.contains("collapsed")) {
        menuItem.innerHTML = `
        <div class="menu-item">
          <span class="one"></span>
          <span class="two"></span>
          <span class="three"></span>
        </div>
        `;
      } else {
        menuItem.innerHTML = `<i class="fa-solid fa-x fs-3"></i>`;
      }
    });
  });
});
