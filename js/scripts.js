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

// Funzione: Apri/chiudi la searchbar
function toggleSearchBar() {
    const form = document.getElementById('search-bar-form');
    const wrapper = form?.closest('.top-bar-form');
    if (!form || !wrapper) return;

    const isOpen = wrapper.classList.toggle('search-open');

    if (isOpen) {
        form.querySelector('.search-input')?.focus();
        document.body.classList.add('noscroll');
    } else {
        document.body.classList.remove('noscroll');
    }
}

// Funzione: Apri/chiudi il menu sections
function toggleSectionsForm() {
    const form = document.getElementById('sections-form');
    const overlay = document.querySelector('.search-overlay');
    if (!form || !overlay) return;

    const isOpen = form.classList.toggle('open');

    if (isOpen) {
        overlay.style.display = 'block';
        document.body.classList.add('noscroll');
    } else {
        overlay.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
}

// Esecuzione principale
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-container-icon');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerIcon = document.getElementById('hamburger');
    const searchWrapper = document.querySelector('.top-bar-form');
    const sectionsForm = document.getElementById('sections-form');
    const overlay = document.querySelector('.search-overlay');

    function openSearchBar() {
        if (!searchWrapper.classList.contains('search-open')) {
            searchWrapper.classList.add('search-open');
            overlay.style.display = 'block';
            document.body.classList.add('noscroll');
            const input = searchWrapper.querySelector('.search-input');
            if (input) input.focus();
        }
    }

    function closeSearchBar() {
        if (searchWrapper.classList.contains('search-open')) {
            searchWrapper.classList.remove('search-open');
            overlay.style.display = 'none';
            document.body.classList.remove('noscroll');
        }
    }

    function openSectionsMenu() {
        if (!sectionsForm.classList.contains('open')) {
            sectionsForm.classList.add('open');
            overlay.style.display = 'block';
            document.body.classList.add('noscroll');
        }
    }

    function closeSectionsMenu() {
        if (sectionsForm.classList.contains('open')) {
            sectionsForm.classList.remove('open');
            overlay.style.display = 'none';
            document.body.classList.remove('noscroll');
            toggleHamburgerIcon(false);
        }
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
            closeSectionsMenu(); // Chiudo il menu se è aperto

            if (searchWrapper.classList.contains('search-open')) {
                closeSearchBar();
            } else {
                openSearchBar();
            }
        });
    }

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeSearchBar(); // Chiudo la search se è aperta

            if (sectionsForm.classList.contains('open')) {
                closeSectionsMenu();
                toggleHamburgerIcon(false); // Torna hamburger
            } else {
                openSectionsMenu();
                toggleHamburgerIcon(true);  // Diventa X
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (searchWrapper.classList.contains('search-open')) {
                closeSearchBar();
            }
            if (sectionsForm.classList.contains('open')) {
                closeSectionsMenu();
                toggleHamburgerIcon(false); // Torna hamburger se chiudo il menu
            }
        });
    }

    // 🔥 --- QUESTO TUTTO LO DEVI LASCIARE ---

    // Apre/chiude footer menu (mobile)
    const toggles = document.querySelectorAll('.footer-menus .menu-item .hidden-row');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const footerMenu = this.parentElement.querySelector('.footer-menu');
            if (footerMenu) {
                footerMenu.style.display = (footerMenu.style.display === 'block') ? 'none' : 'block';
            }
        });
    });

    // Menu dropdown nei sections
    const sectionLinks = document.querySelectorAll('.section-item > a');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const parentItem = this.parentElement;
            const dropdownMenu = parentItem.querySelector('.insite-list');

            if (dropdownMenu) {
                if (dropdownMenu.classList.contains('open')) {
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        dropdownMenu.style.maxHeight = "0px";
                        dropdownMenu.style.opacity = "0";
                    });
                    dropdownMenu.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'max-height') {
                            dropdownMenu.classList.remove('open');
                            dropdownMenu.style.maxHeight = null;
                            dropdownMenu.removeEventListener('transitionend', handler);
                        }
                    });
                } else {
                    dropdownMenu.classList.add('open');
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
                    dropdownMenu.style.opacity = "1";
                }
            }
        });
    });

    // Sticky top-bar
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

    // Scrive la data corrente
    weatherDate();
    weatherDateNav();
});

// E gli eventi di resize e load
window.addEventListener('load', hideOverflowingItems);
window.addEventListener('resize', hideOverflowingItems);


// Eventi al caricamento pagina
window.addEventListener('load', hideOverflowingItems);
window.addEventListener('resize', hideOverflowingItems);
