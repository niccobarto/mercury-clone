// Funzione: Formatta data
function formatDate() {
    const today = new Date();
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${weekDays[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}th ${today.getFullYear()}`;
}
// Funzioni: Scrive la data nei punti giusti
function weatherDate() {
    const datelab = document.getElementById('date-label');
    if (datelab) datelab.innerHTML = formatDate();
}
function weatherDateNav() {
    const datelab = document.getElementById('nav-date-label');
    if (datelab) datelab.innerHTML = formatDate();
}
function checkAriaHidden(){
    const trendingContainer=document.getElementById('trendingContainer');
    const menuSection=document.getElementById('menuSection');
    const mainBarContainer=document.getElementById('mainBarContainer');
    if(window.innerWidth<=1040){
        trendingContainer.setAttribute("aria-hidden","true");
        menuSection.setAttribute("aria-hidden","true");
        mainBarContainer.setAttribute("aria-hidden","true");
    }else{
        trendingContainer.setAttribute("aria-hidden","false");
        menuSection.setAttribute("aria-hidden","false");
        mainBarContainer.setAttribute("aria-hidden","false");
    }
}
// Funzione: Nasconde i trending che sforano
function hideOverflowingItems() {
    const container = document.querySelector('.trending-nav');
    const items = document.querySelectorAll('.trending-list li');
    if (!container) return;

    items.forEach(item => item.style.display = 'inline-block');

    const containerRight = container.getBoundingClientRect().right;

    items.forEach(item => {
        if (item.getBoundingClientRect().right > containerRight) {
            item.style.display = 'none';
        }
    });
}
function isStickyHeader() {
    const sentinella = document.querySelector('.sentinella-stick');
    if (!sentinella) return false;

    const rect = sentinella.getBoundingClientRect();
    return rect.top < 0; // Se il top della sentinella è sopra il viewport, la header è sticky
}
function checkLogoVisibility() {
    const searchBarForm = document.getElementById('search-bar-form');
    const sectionsForm = document.getElementById('sections-form');
    const subscribeForm = document.getElementById('subscribe-form');
    const titleContainer = document.querySelector('.title-container');
    const fixedTop = document.querySelector('.fixed-top');

    const isSticky = isStickyHeader();
    const isAnyMenuOpen = searchBarForm.classList.contains('open') || sectionsForm.classList.contains('open') || subscribeForm.classList.contains('open');

    if (window.innerWidth <= 1040) {
        // SOTTO 1040px: deve SEMPRE essere visibile
        titleContainer.style.visibility = 'visible';
    } else {
        // SOPRA 1040px: si vede solo se sticky o menu aperto
        if (isAnyMenuOpen || isSticky) {
            titleContainer.style.visibility = 'visible';
        } else {
            titleContainer.style.visibility = 'hidden';
        }
    }
}

window.onresize=function() {
    const subscribeForm = document.getElementById('subscribe-form');
    const overlay = document.querySelector('.search-overlay');
    if(window.innerWidth>=1041 && subscribeForm.classList.contains('open')){
        subscribeForm.classList.remove('open');
        overlay.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
    checkLogoVisibility();
    checkAriaHidden();
};
function toggleSubscribeFormArrow(isFormOpen,menuSubDigit){
    const arrowImg=menuSubDigit.querySelector('.menu-sub-arrow');
    if(isFormOpen){
        arrowImg.style.transform = 'rotate(180deg) translate(3px, 3px)';
    }else{
        arrowImg.style.transform = 'rotate(0deg) translate(3px, 3px)';
    }
}
// Esecuzione principale
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-container-icon');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerIcon = document.getElementById('hamburger');
    const searchBarForm = document.getElementById('search-bar-form');
    const sectionsForm = document.getElementById('sections-form');
    const overlay = document.querySelector('.search-overlay');
    const subscribeForm = document.getElementById('subscribe-form');
    const menuSubDigit = document.getElementById('menu-sub-digit');

    function openSearchBar() {
        if (!searchBarForm.classList.contains('open')) {
            searchBarForm.setAttribute('aria-hidden', 'false');
            searchBarForm.classList.add('open');
            overlay.style.display = 'block';
            document.body.classList.add('noscroll');
            const input = searchBarForm.querySelector('.search-input');
            if (input) input.focus();
        }
        checkLogoVisibility();
    }

    function closeSearchBar() {
        if (searchBarForm.classList.contains('open')) {
            searchBarForm.setAttribute('aria-hidden', 'true');
            searchBarForm.classList.remove('open');
            overlay.style.display = 'none';
            document.body.classList.remove('noscroll');
        }
        checkLogoVisibility();
    }
    function openSubscribeForm() {
        if(!subscribeForm.classList.contains('open')) {
            subscribeForm.setAttribute('aria-hidden', 'false');
            subscribeForm.classList.add('open');
            overlay.style.display = 'block';
            document.body.classList.add('noscroll');
            toggleSubscribeFormArrow(true,menuSubDigit);
        }
        checkLogoVisibility();
    }
    function closeSubscribeForm() {
        if(subscribeForm.classList.contains('open')){
            subscribeForm.setAttribute('aria-hidden', 'true');
            subscribeForm.classList.remove('open');
            overlay.style.display = 'none';
            document.body.classList.remove('noscroll');
            toggleSubscribeFormArrow(false,menuSubDigit);
        }
        checkLogoVisibility();
    }
    function openSectionsMenu() {
        if (!sectionsForm.classList.contains('open')) {
            sectionsForm.setAttribute('aria-hidden', 'false');
            sectionsForm.classList.add('open');
            overlay.style.display = 'block';
            document.body.classList.add('noscroll');
        }
        checkLogoVisibility();
    }

    function closeSectionsMenu() {
        if (sectionsForm.classList.contains('open')) {
            sectionsForm.setAttribute('aria-hidden', 'true');
            sectionsForm.classList.remove('open');
            overlay.style.display = 'none';
            document.body.classList.remove('noscroll');
            toggleHamburgerIcon(false);
        }
        checkLogoVisibility();
    }

    function toggleHamburgerIcon(isMenuOpen) {
        const spans = hamburgerIcon.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(46deg) translate(3px, 3px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }

    if (searchButton) {
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeSectionsMenu();
            closeSubscribeForm();
            if (searchBarForm.classList.contains('open')) {
                closeSearchBar();
            } else {
                openSearchBar();
            }
        });
    }
    if(menuSubDigit){
        menuSubDigit.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeSearchBar();
            closeSectionsMenu();
            if(subscribeForm.classList.contains('open')){
                closeSubscribeForm();
            }else{
                openSubscribeForm();
            }
        })
    }
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeSearchBar();
            closeSubscribeForm();
            if (sectionsForm.classList.contains('open')) {
                closeSectionsMenu();
                toggleHamburgerIcon(false);
            } else {
                openSectionsMenu();
                toggleHamburgerIcon(true);
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (searchBarForm.classList.contains('open')) {
                closeSearchBar();
            }
            if (sectionsForm.classList.contains('open')) {
                closeSectionsMenu();
                toggleHamburgerIcon(false);
            }
            if(subscribeForm.classList.contains('open')) {
                closeSubscribeForm();
            }
        });
    }

    // Footer mobile (ok)
    const toggles = document.querySelectorAll('.footer-menus .menu-item .hidden-row');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const footerMenu = this.parentElement.querySelector('.footer-menu');
            if (footerMenu) {
                footerMenu.style.display = (footerMenu.style.display === 'block') ? 'none' : 'block';
            }
        });
    });

    // Sections menu interno
    const sectionLinks = document.querySelectorAll('.section-item > a');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const parentItem = this.parentElement;
            const dropdownMenu = parentItem.querySelector('.insite-list');
            const arrowIcon = this.querySelector('i');

            if (!dropdownMenu) return;

            if (dropdownMenu.classList.contains('open')) {
                link.setAttribute('aria-expanded', 'false');
                dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
                dropdownMenu.offsetHeight;
                dropdownMenu.style.maxHeight = "0px";
                dropdownMenu.style.opacity = "0";
                dropdownMenu.addEventListener('transitionend', function handler(e) {
                    if (e.propertyName === 'max-height') {
                        dropdownMenu.classList.remove('open');
                        dropdownMenu.style.maxHeight = null;
                        dropdownMenu.removeEventListener('transitionend', handler);
                    }
                });
                if (arrowIcon) {
                    arrowIcon.classList.remove('rotate-down');
                }
            } else {
                link.setAttribute('aria-expanded', 'true');
                dropdownMenu.classList.add('open');
                dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
                dropdownMenu.style.opacity = "1";
                if (arrowIcon) {
                    arrowIcon.classList.add('rotate-down');
                }
            }
        });
    });

    // Sticky header
    const sentinella = document.querySelector('.sentinella-stick');
    const fixedTop = document.querySelector('.fixed-top');
    if (sentinella && fixedTop) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                fixedTop.classList.toggle('fixed', !entry.isIntersecting);
            },
            { root: null, threshold: 0 }
        );
        observer.observe(sentinella);
    }
    const showMoreButton=document.getElementById('showMoreButton');
    showMoreButton.addEventListener('click', (event) => {
        const morePhotoSection=document.getElementById('morePhotoSection');
        morePhotoSection.style.display = 'block';
        morePhotoSection.setAttribute('aria-expanded', 'true');
        showMoreButton.style.display = 'none';
    })
    checkAriaHidden();
    checkLogoVisibility();
    weatherDate();
    weatherDateNav();
});

// hide trending items
window.addEventListener('load', hideOverflowingItems);
window.addEventListener('resize', hideOverflowingItems);
window.addEventListener('scroll', checkLogoVisibility);
